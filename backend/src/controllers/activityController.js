let activities = []
let nextId = 1

function createActivity(req, res) {
    const { activity_name, activity_date, activity_time, place, tag, description } = req.body
    const newActivity = {
        id: nextId++,
        activity_name,
        activity_date,
        activity_time,
        place,
        tag,
        description,
        user_id: req.user.id,
        created_at: new Date().toISOString()
    }
    activities.push(newActivity)
    res.json(newActivity)
}

function getActivities(req, res) {
    const myActivities = activities.filter(a => a.user_id === req.user.id)
    res.json(myActivities)
}

function getActivityById(req, res) {
    const activity = activities.find(
        a => a.id == req.params.id && a.user_id === req.user.id
    )
    if (!activity)
        return res.status(404).json({ message: "not found" })
    res.json(activity)
}

function updateActivity(req, res) {
    const activity = activities.find(
        a => a.id == req.params.id && a.user_id === req.user.id
    )
    if (!activity)
        return res.status(404).json({ message: "not found" })

    activity.activity_name = req.body.activity_name
    activity.activity_date = req.body.activity_date
    activity.activity_time = req.body.activity_time
    activity.place = req.body.place
    activity.tag = req.body.tag
    activity.description = req.body.description
    res.json(activity)
}

function deleteActivity(req, res) {
    const activity = activities.find(
        a => a.id == req.params.id && a.user_id === req.user.id
    )
    if (!activity)
        return res.status(404).json({ message: "not found" })

    activities = activities.filter(a => a.id != req.params.id)
    res.json({ message: "deleted" })
}

module.exports = {
    createActivity,
    getActivities,
    getActivityById,
    updateActivity,
    deleteActivity
}