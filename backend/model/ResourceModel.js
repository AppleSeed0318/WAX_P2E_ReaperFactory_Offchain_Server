import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema({

  name: String,
  gasBalance: Number,

});

const ResourceModel = mongoose.model('Resource', resourceSchema);

export default ResourceModel;
