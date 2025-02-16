import React, { useState } from "react";
import WelcomeHeader from "./WelcomeHeader";
import StatCard from "./StatCard";
import LearningModule from "./LearningModule";
import Achievement from "./Achievement";
import SideBar from "./SideBar";

const Dashboard = () => {
  // Sample data - in a real app, this would come from an API or state management
  const [userData, setUserData] = useState({
    name: "John",
    email: "john@example.com",
    streak: 7,
    points: 2450,
    completedTasks: 24,
    level: 5,
    levelTitle: "Explorer",
    modules: [
      {
        id: 1,
        title: "Word Correct",
        progress: 75,
        status: "Continue",
        buttonLabel: "Continue",
        navigate: "/wordcorrect",
      },
      {
        id: 2,
        title: "Spelling Safari",
        progress: 45,
        status: "Continue",
        buttonLabel: "Continue",
        navigate: "/spellingsafari",
      },
      {
        id: 3,
        title: "Spelling Bee",
        progress: 0,
        status: "New",
        buttonLabel: "Start",
        navigate: "/spellingbee",
      },
      {
        id: 4,
        title: "Letter Popup",
        progress: 50,
        status: "Continue",
        buttonLabel: "Continue",
        navigate: "/letterpopup",
      },
      {
        id: 5,
        title: "Card Flip",
        progress: 65,
        status: "Continue",
        buttonLabel: "Continue",
        navigate: "/cardflip",
      },
      {
        id: 6,
        title: "Rhyme Time",
        progress: 90,
        status: "Continue",
        buttonLabel: "Continue",
        navigate: "/rhymetime",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Word Master",
        description: "Completed 50 words correctly",
        icon: "trophy",
      },
      {
        id: 2,
        title: "Perfect Streak",
        description: "7 days learning streak",
        icon: "star",
      },
      {
        id: 3,
        title: "Sharp Eye",
        description: "Found 20 spelling mistakes",
        icon: "target",
      },
    ],
  });

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* Sidebar - pass user data to show in profile */}
      <SideBar name={userData.name} email={userData.email} />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        {/* Welcome Header */}
        <WelcomeHeader name={userData.name} />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <StatCard
            title="Daily Streak"
            value={userData.streak + " Days"}
            subtitle="Keep it up!"
            icon="fire"
            bgColor="bg-purple-50"
          />
          <StatCard
            title="Points"
            value={userData.points.toLocaleString()}
            subtitle="Total earned"
            icon="star"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Completed"
            value={userData.completedTasks}
            subtitle="Tasks this week"
            icon="check"
            bgColor="bg-green-50"
          />
          <StatCard
            title="Level"
            value={`Level ${userData.level}`}
            subtitle={userData.levelTitle}
            icon="target"
            bgColor="bg-blue-50"
          />
        </div>

        {/* Continue Learning Section */}
        <h2 className="text-2xl font-bold mt-12 mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userData.modules.map((module) => (
            <LearningModule
              key={module.id}
              title={module.title}
              progress={module.progress}
              status={module.status}
              buttonLabel={module.buttonLabel}
              navigate={module.navigate}
            />
          ))}
        </div>

        {/* Recent Achievements */}
        <h2 className="text-2xl font-bold mt-12 mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userData.achievements.map((achievement) => (
            <Achievement
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              icon={achievement.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
