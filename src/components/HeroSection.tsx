import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Award, Coffee, Star, Users, Clock, Heart, MapPin, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Nova Souls Cafe Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center min-h-[80vh] py-12 sm:py-16 md:py-20 lg:py-24">
            
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-10 animate-fade-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-accent/20 backdrop-blur-md border border-accent/40 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-accent text-xs sm:text-sm font-semibold shadow-lg">
                <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline"></span>
                <span className="sm:hidden"></span>
              </div>

              {/* Main Heading */}
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1]">
                  
                  <span className="block bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent mt-1">
                    
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                  
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 py-3 sm:py-4 md:py-6">
                <div className="text-center group">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform duration-300">0</div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium"></div>
                </div>
                <div className="text-center group">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform duration-300">0</div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium"></div>
                </div>
                <div className="text-center group">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform duration-300">0</div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium"></div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white shadow-2xl hover:shadow-accent/25 transition-all duration-300 group text-xs sm:text-sm md:text-base px-4 sm:px-6 py-3 sm:py-4 rounded-xl"
                >
                  <Link to="/menu" className="flex items-center justify-center">
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md group text-xs sm:text-sm md:text-base px-4 sm:px-6 py-3 sm:py-4 rounded-xl"
                >
                  <Link to="/events" className="flex items-center justify-center">
                    <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/25 to-accent/35 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Coffee className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm mb-1"></div>
                      <div className="text-white/80 text-xs"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/25 to-accent/35 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm mb-1"></div>
                      <div className="text-white/80 text-xs"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/25 to-accent/35 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm mb-1"></div>
                      <div className="text-white/80 text-xs"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/25 to-accent/35 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm mb-1"></div>
                      <div className="text-white/80 text-xs"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-accent/15 to-primary/15 backdrop-blur-md border border-accent/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/25 rounded-lg flex items-center justify-center">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xs sm:text-sm"></div>
                        <div className="text-white/80 text-xs"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                      <span className="text-white font-semibold text-xs sm:text-sm"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2 border-t border-white/20">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                    <span className="text-white/90 text-xs"></span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                    <span className="text-white/90 text-xs"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;