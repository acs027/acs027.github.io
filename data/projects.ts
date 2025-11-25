import { useTranslation } from "react-i18next";

export type Project = {
  title: string;
  repoLink: string;
  appStoreLink?: string;
  testFlightLink?: string;
  description: string;
  shortDescription: string;
  thumbnail: string | any;
  techStack?: string[];
  images?: (string | any)[];
  gif?: (string | any)[];
};

export const projects: Project[] = [
  {
    title: "E6B Flight Pro",
    repoLink: "https://github.com/acs027/FlightComputer",
    appStoreLink: "https://apps.apple.com/tr/app/e6b-flight-pro/id6743019639",
    description:
      "E6B Flight Pro is a precise digital replica of the classic E6B flight computer, built for pilots, student aviators, and aviation enthusiasts.",
    shortDescription:"A digital replica of the E6B flight computer for pilots and aviation students.",
    thumbnail:require("@/assets/images/flightcomputer01.png"),
      techStack: [
        "SwiftUI", 
        "MVVM", 
        "XCTest",
        "Fastlane", 
        "Github Actions",
        "AdMob"
      ],
    images: [
      require("../assets/images/flightcomputer01.png"),
      require("../assets/images/flightcomputer02.png"),
    ],
    gif: [require("../assets/gifs/flightcomputergif.gif")],
  },

    {
    title: "TravelPlanner",
    repoLink: "https://github.com/acs027/TravelPlanner",
    description:
      "An AI-powered iOS travel planning application that helps users discover and explore destinations. It leverages Google's Gemini AI along with interactive maps, onboarding, authentication, and local persistence.",
    shortDescription:"An AI-powered iOS travel planning application that helps users discover and explore destinations.",
    thumbnail:require("../assets/TravelPlanner/travelplanner1.png"),
      techStack: [
        "UIKit", 
        "VIPER", 
        "Modular",
        "Programmatic UI", 
        "XIB", 
        "Core Data", 
        "MapKit", 
        "Firebase", 
        "Gemini AI"
      ],
    images: [
      require("../assets/TravelPlanner/travelplanner1.png"),
      require("../assets/TravelPlanner/travelplanner2.png"),
    ],
    gif: [require("../assets/TravelPlanner/travelplannergif.gif")],
  },

  {
    title: "Aircraft Identifier",
    repoLink: "https://github.com/acs027/AircraftIdentifier",
    testFlightLink: "https://testflight.apple.com/join/BBa8QBGy",
    description:
      "An iOS application for identifying aircraft from photos using AI-powered image analysis.",
    shortDescription:"An iOS application for identifying aircraft from photos using AI-powered image analysis.",
    thumbnail:require("../assets/AircraftIdentifier/mainimage.png"),
      techStack: [
        "SwiftUI", 
        "MVVM",
        "App Intent",
        "Siri", 
        "Gemini", 
        "Firebase AI Logic", 
        "Firebase App Check", 
      ],
    images: [
      require("../assets/AircraftIdentifier/mainimage.png"),
      require("../assets/AircraftIdentifier/resultimage.png"),
    ],
    gif: [require("../assets/AircraftIdentifier/demo.gif"),],
  },

    {
    title: "MyMovieApp",
    repoLink: "https://github.com/acs027/MyMovieApp",
    description:
      "A SwiftUI-based movie app that lets users explore movies and stay updated with the latest releases. This app features API integration for fetching movie data, caching using Core Data, user-friendly interface.",
    shortDescription:"A movie discovery app with API integration and offline caching.",
    thumbnail:"https://github.com/user-attachments/assets/322c26f5-b2c8-458b-8163-0303982a8b43",
      techStack: [
        "SwiftUI", 
        "MVVM",
        "Alamofire", 
        "Core Data", 
        "TMDB API", 
        "WebKit", 
      ],
    images: [
      "https://github.com/user-attachments/assets/322c26f5-b2c8-458b-8163-0303982a8b43",
      "https://github.com/user-attachments/assets/9483a608-4453-47b0-8cd9-ae9595e82052",
    ],
    gif: ["https://github.com/user-attachments/assets/52409856-b198-4f1b-a7b0-dc1d6f6c996e"],
  },
    


  {
    title: "ATPL Tester",
    repoLink: "https://github.com/acs027/ATPLTester.git",
    description:
      "Modern iOS app designed to help users prepare for the Airline Transport Pilot License (ATPL) exams.",
    shortDescription:"Modern iOS app designed to help users prepare for the Airline Transport Pilot License (ATPL) exams",
    thumbnail:require("../assets/AtplTester/atpltester1.png"),
      techStack: ["SwiftUI", "MVVM", "SwiftData", ],
    images: [
      require("../assets/AtplTester/atpltester1.png"),
      require("../assets/AtplTester/atpltester2.png"),
      require("../assets/AtplTester/atpltester3.png"),
    ],
  },

  // {
  //   title: "Chat App",
  //   repoLink: "https://github.com/acs027/ChatApp",
  //   description:
  //     "This app allows users to communicate in real-time, featuring user authentication, message storage, and user profile photos, all powered by Firebase.",
  //   shortDescription:"A real-time messaging app with authentication and media support.",
  //   thumbnail:"https://github.com/user-attachments/assets/330470c6-957a-4d73-be7a-92dfb0eb524b",
  //     techStack: ["SwiftUI", "Firebase Auth", "Firebase Storage", "Firestore"],
  //   images: [
  //     "https://github.com/user-attachments/assets/330470c6-957a-4d73-be7a-92dfb0eb524b",
  //     "https://github.com/user-attachments/assets/f7a58bf1-d890-465a-a964-e441b3c2f0b8",
  //     "https://github.com/user-attachments/assets/dce5ab5d-5524-45fb-a36d-1e06f1c3a837",
  //   ],
  // },
  {
    title: "GLOOMHAVEN ATTACKER",
    repoLink: "https://github.com/acs027/Gloomhaven-Attacker",
    appStoreLink: "https://apps.apple.com/us/app/gloomhaven-attacker/id6447918398",
    description: "Helper app for the Gloomhaven boardgame.",
    shortDescription:"A helper app for managing attacks in the Gloomhaven board game.",
    thumbnail:"https://github.com/user-attachments/assets/c67a874e-7d69-4804-bd64-a9fba85ecad9",
    images: [
      "https://github.com/user-attachments/assets/c67a874e-7d69-4804-bd64-a9fba85ecad9",
      "https://github.com/user-attachments/assets/34b5cd55-1375-4b84-bc4a-8af482f8f5d7",
      "https://github.com/user-attachments/assets/d7ff6980-c426-40f0-9d96-d5d193322a88",
    ],
  },
  // {
  //   title: "Insta Profile",
  //   repoLink: "https://github.com/acs027/InstaProfileStudy",
  //   description:
  //     "A replica of the Instagram profile screen built using UIKit. This project is designed to practice and enhance my skills with UIKit.",
  //   techStack: ["UIKit", "MVVM", "Combine", "Alamofire"],
  //   shortDescription:"A replica of the Instagram profile screen built with UIKit.",
  //   thumbnail:"https://github.com/acs027/InstaProfileStudy/blob/main/screenshots/screenshot1.png?raw=true",
  //   images: [
  //     "https://github.com/acs027/InstaProfileStudy/blob/main/screenshots/screenshot1.png?raw=true",
  //     "https://github.com/acs027/InstaProfileStudy/blob/main/screenshots/screenshot2.png?raw=true",
  //   ],
  //   gif: [
  //     "https://github.com/acs027/InstaProfileStudy/blob/main/screenshots/app.gif?raw=true",
  //   ],
  // },
  // {
  //   title: "XFeed",
  //   repoLink: "https://github.com/acs027/XFeedStudy",
  //   description:
  //     "A replica of the X Feed screen built using UIKit. This project is designed to practice and enhance my skills with UIKit.",
  //   techStack: ["UIKit", "MVVM", "Combine", "SnapKit"],
  //   shortDescription:"A UIKit-based replica of the X (Twitter) feed screen.",
  //   thumbnail:"https://github.com/acs027/XFeedStudy/blob/main/screenshots/screenshot1.png?raw=true",
  //   images: [
  //     "https://github.com/acs027/XFeedStudy/blob/main/screenshots/screenshot1.png?raw=true",
  //   ],
  // },
];
