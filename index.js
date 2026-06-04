const sql = require('mssql');

const config = {
    connectionString: process.env.SQL_CONNECTION_STRING
};

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

    try {
        await sql.connect(config);

        const result = await sql.query`
            SELECT job_id, status, technician, venue, created_at 
            FROM jobs 
            WHERE job_id = ${job_id}
        `;

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
        context.log.error('Database error:', err);
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: { error: "Database connection failed", detail: err.message }
        };
    } finally {
        await sql.close();
    }
};