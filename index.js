module.exports = async function (context, req) {
    const job_id = req.query.job_id || (req.body && req.body.job_id);

    if (!job_id) {
        context.res ={
            status: 400,
            headers: { "Content-Tpye": "application/json"},
            body: {error: "job_id is required"}
        };
        return;
    }

    const job = {
        job_id: job_id,
        status: "in_progress",
        technician: "Jeffrey Lo",
        venue: "Demo Site - Brisbane",
        created_at: new Date().toISOString(),
        source: "Azure Function App -jlo128456crm"
    };

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: job
    }
}