import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs'
import { Repository } from 'typeorm';
import User from '../database/entities/user.entity';
import UserProfile from '../database/entities/userProfile.entity';
import UserAssets from '../database/entities/userAssets.entity';
import { Iprofile } from '../interfaces/profile.interface';
import { Iassets } from '../interfaces/assets.interface';
import UserActivity from '../database/entities/userActivity.entity';
import { createActivityI, fetchActivityI } from 'src/interfaces/activity.interface';

@Injectable()
export class UserService{
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('PROFILE_REPOSITORY') private profileRepository: Repository<UserProfile>,
    @Inject('ASSETS_REPOSITORY') private assetsRepository: Repository<UserAssets>,
    @Inject('ACTIVITY_REPOSITORY') private activityRepository: Repository<UserActivity>,
  ) {}

  async create(userData:User): Promise<User> {
    const user =this.userRepository.create(userData);
    const profile = this.profileRepository.create({});
    const assets = this.assetsRepository.create({})
    user.profile = profile;
    user.assets = assets;
    return this.userRepository.save(user)
  }

  async fetchAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async fetchOne(userName:string): Promise<User> {
    return this.userRepository.findOne({where:{userName}});
  }

  async fetchById(id:number): Promise<User> {
    return this.userRepository.findOne(
       {
          where:{id},
          relations:['profile', 'assets', 'fri','fri.fra.assets', 'fra.fri', 'fra', 'fra.fri.assets']
       });

  }

  async updateProfile(id:number ,userProfile:Iprofile): Promise<Iprofile> {
    const profile = await this.profileRepository.findOne({where:{id}});
    const newProfile = this.profileRepository.merge(profile, userProfile)
    return await this.profileRepository.save(newProfile)
  }

  async updateProfileImg(id:number ,profileImgPath:string): Promise<Iassets> {
    const assets = await this.assetsRepository.findOne({where:{id}});
    if (assets.userProfile!=='' && fs.existsSync(`src/uploads/${assets.userProfile}`)) 
       fs.unlinkSync(`src/uploads/${assets.userProfile}`);
    const newAssets = this.assetsRepository.merge(assets, {userProfile:profileImgPath})
    return await this.assetsRepository.save(newAssets)
  }

  async updateBkgdImg(id:number ,backgroundImgPath:string): Promise<UserAssets> {
    const assets = await this.assetsRepository.findOne({where:{id}});
    if (assets.userBackground!=='' && fs.existsSync(`src/uploads/${assets.userBackground}`)) 
       fs.unlinkSync(`src/uploads/${assets.userBackground}`);
    const newAssets = this.assetsRepository.merge(assets, {userBackground:backgroundImgPath})
    return await this.assetsRepository.save(newAssets)
  }

  async createActivity(activity:createActivityI): Promise<fetchActivityI> {
    const newActivity = this.activityRepository.create(activity);
    return await this.activityRepository.save(newActivity)
  }

  async updateActivity(id:number): Promise<fetchActivityI> {
    const activity = await this.activityRepository.findOne({where:{id}});
    activity.isAccepted = true;
    return await this.activityRepository.save(activity)
  }

}