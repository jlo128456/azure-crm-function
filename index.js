const sql = require('mssql');

module.exports = async function (context, req) {

    const job_id = req.query.job_id || (req.body && req.body.job_id);

    if (!job_id) {
        context.res = {
            status: 400,
            headers: { "Content-Type": "application/json" },
            body: { error: "job_id is required" }
        };
        return;
    }

    let pool;
    try {
        pool = await new sql.ConnectionPool({
            server: 'jlo-crm-server.database.windows.net',
            database: 'free-sql-db-4024986',
            user: 'jloadmin',
            password: process.env.SQL_PASSWORD,
            port: 1433,
            options: {
                encrypt: true,
                trustServerCertificate: false
            }
        }).connect();

        const result = await pool.request()
            .input('job_id', sql.VarChar, job_id)
            .query('SELECT job_id, status, technician, venue, created_at FROM jobs WHERE job_id = @job_id');

        if (result.recordset.length === 0) {
            context.res = {
                status: 404,
                headers: { "Content-Type": "application/json" },
                body: { error: "Job not found" }
            };
            return;
        }

        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: result.recordset[0]
        };

    } catch (err) {
        context.log.error('Database error:', err.message);
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: { error: "Database error", detail: err.message }
        };
    } finally {
        if (pool) await pool.close();
    }
};
