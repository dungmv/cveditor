const Resume = require('../databases/models/Resume');

const get = async (req, res) => {
    const resumeId = parseInt(req.params.id);
    const resume = await Resume.findOne({ where: { id: resumeId } });
    if (!resume) {
        res.statusCode = 404;
        res.json({ err: 1, msg: 'resume not found' });
        return
    }

    const { name, templateId, layout, themeId } = resume;
    res.json({ name, templateId, layout, themeId });
}

const update = (req, res) => {
    const resumeId = parseInt(req.params.id);
    const layout = req.params.layout;
    await Resume.update({ layout: layout }, { where: { id: resumeId } });
    res.json({ err: 0, msg: 'success' });
}

module.exports = {
    get,
    update
}
