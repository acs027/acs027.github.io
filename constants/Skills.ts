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
import { JiraIcon } from '@/components/icons/skills/JiraIcon';

export type Skill = {
  name: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const SKILLS: SkillCategory[] = [
  {
    title: 'Languages & Core',
    skills: [
      { name: 'Swift', Icon: SwiftIcon },
      { name: 'SwiftUI', Icon: SwiftIcon },
      { name: 'UIKit', Icon: UIKitIcon },
      { name: 'Combine', Icon: SwiftIcon },
      { name: 'React', Icon: ReactIcon },
      { name: 'Expo', Icon: ExpoIcon },
      { name: 'JavaScript', Icon: JavaScriptIcon },
      { name: 'TypeScript', Icon: TypescriptIcon },
      { name: 'Python', Icon: PythonIcon },
    ],
  },
  {
    title: 'Architectures',
    skills: [
      { name: 'MVVM', Icon: SwiftIcon },
      { name: 'VIPER', Icon: SwiftIcon },
      { name: 'Modular Architecture', Icon: SwiftIcon },
    ],
  },

  {
    title: 'Data, Networking & Services',
    skills: [
      { name: 'CoreData', Icon: UIKitIcon },
      { name: 'SwiftData', Icon: UIKitIcon },
      { name: 'RESTful APIs', Icon: SwiftIcon },
      { name: 'Alamofire', Icon: SwiftIcon },
      { name: 'Firebase', Icon: FirebaseIcon },
      { name: 'AdMob', Icon: AdMobIcon }, // ✔ moved here
    ],
  },

  {
    title: 'Developer Tools',
    skills: [
      { name: 'Cursor', Icon: SwiftIcon },
      { name: 'Gemini CLI', Icon: SwiftIcon },
      { name: 'Xcode', Icon: XCodeIcon },
      { name: 'Git', Icon: GitIcon },
      { name: 'GitHub Actions', Icon: GithubActionsIcon },
      { name: 'Fastlane', Icon: FastlaneIcon },
      { name: 'SPM', Icon: SwiftIcon },
      { name: 'VSCode', Icon: VSCodeIcon },
      { name: 'Jira', Icon: JiraIcon },
    ],
  },
];
