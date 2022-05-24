import asyncHandler from 'express-async-handler';
import StakeModel from '../model/StakeModel.js';

let periodFoundrie= 3 * 60 * 1000; // 10 seconds = 10000 milliseconds
let periodOil= 3 * 60 * 1000; // 10 seconds = 10000 milliseconds

const getStakeList = asyncHandler(async (req, res) => {
  
  const { name } = req.params;
  const stakeData = await StakeModel.findOne({name: name});

  if(stakeData != null) {
    let nowTime = new Date();

    let _result = stakeData.stakeList.map(item => {
      let _item = JSON.parse(JSON.stringify(item));

      if(new Date(_item.next_run) <= nowTime) {
        _item["lefttime"] = 0;
      }
      else {
        _item["lefttime"] = parseInt((new Date(_item.next_run) - nowTime)/1000);
      }

      return _item;
    });

    console.log(_result);

    stakeData.stakeList = _result;
    stakeData.save();
    res.status(201).json(_result);
    return;
  }
  res.status(201).json([]);
});

const createStake = asyncHandler(async (req, res) => {
  const { name, asset_id, memo } = req.body;
  const existStake = await StakeModel.findOne({name: name});

  let nowTime = new Date();
  
  console.log("create stake");
  console.log(name, asset_id, memo);

  var regmachine = { machine: memo, nfts: asset_id, last_update: nowTime, next_run: null };

  if (memo == "Foundries")
  {
    regmachine.next_run = new Date(nowTime.getTime() + periodFoundrie);
  }
  else if(memo == "Oil")
  {
    regmachine.next_run = new Date(nowTime.getTime() + periodOil);
  }

  if(existStake) {
    let _stakeList = [...existStake.stakeList];
    _stakeList.push(regmachine);

    existStake.stakeList = _stakeList;
    const updatedStake = await existStake.save();
    res.json(updatedStake);
  }
  else {
    let _stakeList = [];
    _stakeList.push(regmachine);

    const newStake = new StakeModel({
      name: name,
      stakeList: _stakeList,
    });
    try {
      await newStake.save();
      res.status(201).json(newStake);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
});

const removeStake = asyncHandler(async (req, res) => {
  const { name, asset_id, memo } = req.body;
  const existStake = await StakeModel.findOne({name: name});

  if(existStake && asset_id.length > 0) {
    let _stakeList = [...existStake.stakeList];
    
    let result = _stakeList.map(word => {
      let _nfts = word.nfts;
      _nfts = _nfts.filter(nft => nft != asset_id[0]);
      word.nfts = _nfts;
      return word;
    });

    result = result.filter(res => res.nfts.length>0);

    existStake.stakeList = result;
    
    const updatedStake = await existStake.save();
    res.json(updatedStake);
    return ;
  }
  res.json(updatedStake);
});

const claimStake = asyncHandler(async (req, res) => {
  const { name, asset_id, memo } = req.body;
  const existStake = await StakeModel.findOne({name: name});

  if(existStake) {
    let _stakeList = [...existStake.stakeList];
    
    let result = _stakeList.map(word => {
      
      // nft id = asset_id, change countdown

      if(word.nfts.length > 0 && word.nfts[0] == asset_id[0]) {
        let nowTime = new Date();
        if(word.machine == "Oil") {
          word.next_run = new Date(nowTime.getTime() + periodFoundrie);;
        } else if (word.machine == "Oil") {
          word.next_run = new Date(nowTime.getTime() + periodOil);;
        }
      }
      return word;
    });

    existStake.stakeList = result;
    
    const updatedStake = await existStake.save();
    res.json(updatedStake);
  }
});

export {
  getStakeList,
  createStake,
  removeStake,
  claimStake,
};
