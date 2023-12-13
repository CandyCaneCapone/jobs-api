const Jobs = require("../models/job");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");

const getAllJobs = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const jobs = await Jobs.find({ createdBy: userId });
    res.json({ jobs });
  } catch (error) {
    next(error);
  }
};

const getSingleJob = async (req, res, next) => {
  const jobId = req.params.id;
  const userId = req.user._id;

  try {
    const job = await Jobs.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError(`no job with id ${jobId}`);
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await Jobs.create({ ...req.body, createdBy: userId });
    res.status(201).json({ message: "job created" });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  const jobId = req.params.id;
  const userId = req.user._id;
  const updateFields = {};
  const { title, company, position, status } = req.body;

  if (title) updateFields.title = title;
  if (company) updateFields.company = company;
  if (position) updateFields.position = position;
  if (status) updateFields.status = status;

  try {
    if (Object.keys(updateFields).length === 0) {
      throw new BadRequestError("No valid fields provided for update");
    }
    const newJob = await Jobs.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newJob) {
      throw new NotFoundError(`no job with id ${jobId}`);
    }

    res.json({ message: "job updated", job: newJob });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  const jobId = req.params.id;
  const userId = req.user._id;

  try {
    const job = await Jobs.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError(`no job with id ${jobId}`);
    }

    res.json({message : "job deleted" , job})
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
