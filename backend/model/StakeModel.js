import mongoose from 'mongoose';

const stakeSchema = mongoose.Schema({
  
  name: String,
  stakeList: [{
    machine: String,
    nfts: Array,
    last_update: Date,
    next_run: Date,
  }],
});

const StakeModel = mongoose.model('Stake', stakeSchema);

export default StakeModel;
