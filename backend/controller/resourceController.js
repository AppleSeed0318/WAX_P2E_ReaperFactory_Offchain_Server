import asyncHandler from 'express-async-handler';
import ResourceModel from '../model/ResourceModel.js';

const addGasBalance = asyncHandler(async (req, res) => {
  
  const { name } = req.params;
  console.log(name);

  const resData = await ResourceModel.findOne({name: name});

  console.log("add balance = ", resData);

  if(resData != null) { //add gas resource by 1000
    resData.gasBalance += 1000;
    await resData.save();
    res.status(201).json(resData);
  }
  else { // create new res for user
    const newResource = new ResourceModel({
      name: name,
      gasBalance: 1000,
    });

    try {
      await newResource.save();
      res.status(201).json(newResource);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
});

const getGasBalance = asyncHandler(async (req, res) => {
  const { name } = req.params;

  console.log(name);
  const resData = await ResourceModel.findOne({name: name});
  if(resData!=null) {
    res.status(200).json(resData);
  }
  else {
    res.status(200).json([]);
  }
  
  
});

export {
  addGasBalance,
  getGasBalance,
};
