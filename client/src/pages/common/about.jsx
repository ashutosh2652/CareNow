import React, { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Shield,
  Award,
  Clock,
  Stethoscope,
  Activity,
  ChevronRight,
  Star,
  Globe,
  Zap,
  Target,
} from "lucide-react";

const AboutUs = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [countedNumbers, setCountedNumbers] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    satisfaction: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targets = {
      doctors: 500,
      patients: 10000,
      appointments: 50000,
      satisfaction: 98,
    };
    const duration = 2000;
    const steps = 60;
    const increment = {
      doctors: targets.doctors / steps,
      patients: targets.patients / steps,
      appointments: targets.appointments / steps,
      satisfaction: targets.satisfaction / steps,
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCountedNumbers({
          doctors: Math.floor(increment.doctors * currentStep),
          patients: Math.floor(increment.patients * currentStep),
          appointments: Math.floor(increment.appointments * currentStep),
          satisfaction: Math.floor(increment.satisfaction * currentStep),
        });
        currentStep++;
      } else {
        setCountedNumbers(targets);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      label: "Active Doctors",
      value: countedNumbers.doctors + "+",
      icon: Stethoscope,
      color: "from-blue-500 to-cyan-400",
    },
    {
      label: "Patients Served",
      value: countedNumbers.patients.toLocaleString() + "+",
      icon: Users,
      color: "from-purple-500 to-pink-400",
    },
    {
      label: "Appointments",
      value: countedNumbers.appointments.toLocaleString() + "+",
      icon: Clock,
      color: "from-green-500 to-emerald-400",
    },
    {
      label: "Satisfaction Rate",
      value: countedNumbers.satisfaction + "%",
      icon: Star,
      color: "from-orange-500 to-yellow-400",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description:
        "Every decision we make revolves around improving patient outcomes and experiences.",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Data Security",
      description:
        "Military-grade encryption ensures your medical data remains private and protected.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "Cutting-edge technology meets healthcare to create seamless medical experiences.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Precision & Excellence",
      description:
        "Accurate scheduling, reliable systems, and flawless execution every single time.",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Michael Rodriguez",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Dr. James Wilson",
      role: "Head of Innovation",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Emily Johnson",
      role: "CTO",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section
        className={`relative pt-20 pb-32 px-6 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm font-medium">
              Revolutionizing Healthcare Management
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            About MediManage
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between doctors and patients with intelligent
            scheduling, seamless communication, and data-driven healthcare
            solutions.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:bg-white/10"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  ></div>
                  <Icon
                    className={`w-8 h-8 mb-3 bg-gradient-to-br ${stat.color} bg-clip-text`}
                    style={{
                      color: "transparent",
                      background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                      WebkitBackgroundClip: "text",
                    }}
                  />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We're on a mission to transform healthcare delivery by creating
                a seamless ecosystem where medical professionals can focus on
                what matters most - patient care.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Through innovative technology and human-centered design, we're
                eliminating administrative burdens, reducing wait times, and
                ensuring every patient receives the attention they deserve.
              </p>
              <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                Learn More
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <Globe className="w-full h-64 text-white/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">24/7</div>
                    <div className="text-xl text-gray-300">
                      Global Healthcare Access
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              const isActive = i === activeValue;
              return (
                <div
                  key={i}
                  className={`relative group cursor-pointer transform transition-all duration-500 ${
                    isActive ? "scale-105" : "scale-100 hover:scale-105"
                  }`}
                  onClick={() => setActiveValue(i)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
                      isActive
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${value.gradient} mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Leadership Team
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="group relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10">
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of healthcare professionals already using
              MediManage
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                Get Started Today
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
