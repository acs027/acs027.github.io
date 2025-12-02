import { SwiftIcon } from '@/components/icons/skills/SwiftIcon';
import { JavaScriptIcon } from '@/components/icons/skills/JavaScriptIcon';
import { ReactIcon } from '@/components/icons/skills/ReactIcon';
import { PythonIcon } from '@/components/icons/skills/PythonIcon';
import { FirebaseIcon } from '@/components/icons/skills/FirebaseIcon';
import { IllustratorIcon } from '@/components/icons/skills/IllustratorIcon';
import { PhotoshopIcon } from '@/components/icons/skills/PhotoshopIcon';
import { GitIcon } from '@/components/icons/skills/GitIcon';
import { UIKitIcon } from '@/components/icons/skills/UIKitIcon';
import { TypescriptIcon } from '@/components/icons/skills/TypescriptIcon';
import { XCodeIcon } from '@/components/icons/skills/XCodeIcon';
import { VSCodeIcon } from '@/components/icons/skills/VSCodeIcon';
import { ExpoIcon } from '@/components/icons/skills/ExpoIcon';
import { AdMobIcon } from '@/components/icons/skills/AdMob';
import { GithubActionsIcon } from '@/components/icons/skills/GithubActions';
import { FastlaneIcon } from '@/components/icons/skills/FastlaneIcon';

export type Skill = {
  name: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const SKILLS1: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { 
        name: 'Swift',
        Icon: SwiftIcon
      },
      { 
        name: 'Javascript',
        Icon: JavaScriptIcon
      },
      { 
        name: 'Typescript',
        Icon: TypescriptIcon
      },
      { 
        name: 'Python', 
        Icon: PythonIcon
      },
    ]
  },
  {
    title: 'Frameworks',
    skills: [
      { 
        name: 'SwiftUI',
        Icon: SwiftIcon
      },
      { 
        name: 'UIKit',
        Icon: UIKitIcon
      },
      { 
        name: 'React',
        Icon: ReactIcon
      },
             { 
        name: 'Expo', 
        Icon: ExpoIcon
      },
        { 
        name: 'MapKit', 
        Icon: SwiftIcon
      },
        { 
        name: 'WebKit', 
        Icon: SwiftIcon
      },
      { 
        name: 'SnapKit', 
        Icon: SwiftIcon
      },
    ]
  },
  {
    title: 'Architecture & Principles',
    skills: [
      {
        name: 'MVVM',
        Icon: SwiftIcon
      },
      {
        name: 'VIPER',
        Icon: SwiftIcon
      },
      {
        name: 'Modular Architecture',
        Icon: SwiftIcon
      },
      {
        name: 'SOLID Principles',
        Icon: SwiftIcon
      },
    ]
  },
  {
    title: 'Tools & Technologies',
    skills: [
        { 
        name: 'XCode', 
        Icon: XCodeIcon
      },
      { 
        name: 'Git', 
        Icon: GitIcon
      },
       { 
        name: 'Github Actions', 
        Icon: GithubActionsIcon
      },
       { 
        name: 'Fastlane', 
        Icon: FastlaneIcon
      },

    
         { 
        name: 'CoreData',
        Icon: UIKitIcon
      },
         { 
        name: 'SwiftData',
        Icon: UIKitIcon
      },

        {
        name: 'Alamofire',
        Icon: SwiftIcon
      },
         { 
        name: 'Firebase', 
        Icon: FirebaseIcon
      },

 
          { 
        name: 'AdMob', 
        Icon: AdMobIcon
      },
       { 
        name: 'VSCode', 
        Icon: VSCodeIcon
      },
     
      { 
        name: 'Adobe Photoshop', 
        Icon: PhotoshopIcon
      },
      { 
        name: 'Adobe Illustrator', 
        Icon: IllustratorIcon
      },
    ]
  },
  {
    title: 'Other',
    skills: [
                   { 
        name: 'RESTful APIs', 
        Icon: SwiftIcon
      },
                   { 
        name: 'Combine', 
        Icon: SwiftIcon
      },
                   { 
        name: 'Programmatic UI', 
        Icon: SwiftIcon
      },
                 { 
        name: 'App Intents', 
        Icon: SwiftIcon
      },
    ]
  }
]; 