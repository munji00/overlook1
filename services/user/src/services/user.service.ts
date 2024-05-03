import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs'
import { DeepPartial, Repository } from 'typeorm';
import User from '../database/entities/user.entity';
import UserProfile from '../database/entities/userProfile.entity';
import UserAssets from '../database/entities/userAssets.entity';
import UserActivity from '../database/entities/userActivity.entity';
import {  CreateUserActivityI} from 'src/interfaces/activity.interface';
import { UserResponseDto } from 'src/dto/user.dto';
import { UserProfileResponseDto } from 'src/dto/profile.dto';
import { UserAssetsResponseDto } from 'src/dto/assets.dto';
import { UserActivityResponseDto } from 'src/dto/activity.dto';
import { CreateUserI } from 'src/interfaces/user.interface';
import { UpdateUserProfileI } from 'src/interfaces/profile.interface';

@Injectable()
export class UserService{
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('PROFILE_REPOSITORY') private profileRepository: Repository<UserProfile>,
    @Inject('ASSETS_REPOSITORY') private assetsRepository: Repository<UserAssets>,
    @Inject('ACTIVITY_REPOSITORY') private activityRepository: Repository<UserActivity>,
  ) {}

  //service to create new user
  async create(userData:CreateUserI): Promise<UserResponseDto> {
    const user =this.userRepository.create(userData as DeepPartial<User>);
    const profile = this.profileRepository.create({});
    const assets = this.assetsRepository.create({})
    user.profile = profile;
    user.assets = assets;
    return this.userRepository.save(user)
  }


  async fetchAll(): Promise<UserResponseDto[]> {
    return this.userRepository.find();
  }
  

  async fetchOne(userName:string): Promise<UserResponseDto> {
    return this.userRepository.findOne({where:{userName}});
  }
  

  async fetchById(id:number): Promise<UserResponseDto> {
    return this.userRepository.findOne(
       {
          where:{id},
          relations:['profile', 'assets', 'fri','fri.fra.assets', 'fra.fri', 'fra', 'fra.fri.assets']
       });

  }

  async updateProfile(id:number ,userProfile:Partial<UpdateUserProfileI>): Promise<UserProfileResponseDto> {
    const profile = await this.profileRepository.findOne({where:{id}});
    const newProfile = this.profileRepository.merge(profile, userProfile)
    return await this.profileRepository.save(newProfile)
  }


  async updateProfileImg(id:number ,profileImgPath:string): Promise<UserAssetsResponseDto> {
    const assets = await this.assetsRepository.findOne({where:{id}});
    if (assets.userProfile!=='' && fs.existsSync(`src/uploads/${assets.userProfile}`)) 
       fs.unlinkSync(`src/uploads/${assets.userProfile}`);
    const newAssets = this.assetsRepository.merge(assets, {userProfile:profileImgPath})
    return await this.assetsRepository.save(newAssets)
  }


  async updateBkgdImg(id:number ,backgroundImgPath:string): Promise<UserAssetsResponseDto> {
    const assets = await this.assetsRepository.findOne({where:{id}});
    if (assets.userBackground!=='' && fs.existsSync(`src/uploads/${assets.userBackground}`)) 
       fs.unlinkSync(`src/uploads/${assets.userBackground}`);
    const newAssets = this.assetsRepository.merge(assets, {userBackground:backgroundImgPath})
    return await this.assetsRepository.save(newAssets)
  }


  async createActivity(activity:CreateUserActivityI): Promise<UserActivityResponseDto> {
    const newActivity = this.activityRepository.create(activity);
    return await this.activityRepository.save(newActivity)
  }


  async updateActivity(id:number): Promise<UserActivityResponseDto> {
    const activity = await this.activityRepository.findOne({where:{id}});
    activity.isAccepted = true;
    return await this.activityRepository.save(activity)
  }
}