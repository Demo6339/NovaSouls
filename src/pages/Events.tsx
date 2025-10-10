import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Gift, Percent, Star, Users, Heart, Share2, Filter, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import coffeeImage from "@/assets/coffee-1.jpg";

const events = [];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  const getTypeBadge = (type: string) => {
    const variants = {
      promotion: { label: "Khuyến mãi", className: "bg-gradient-to-r from-orange-400 to-red-500 text-white" },
      event: { label: "Sự kiện", className: "bg-gradient-to-r from-purple-400 to-pink-500 text-white" },
      workshop: { label: "Workshop", className: "bg-gradient-to-r from-green-400 to-blue-500 text-white" },
    };
    const variant = variants[type as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const toggleLike = (eventId: number) => {
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const featuredEvent = events.find(event => event.featured);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      <main className="flex-1 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="container px-3 sm:px-4 mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              <span className="text-accent font-semibold text-sm sm:text-base">Sự kiện đặc biệt</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Sự kiện & Khuyến mãi
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              Khám phá những ưu đãi hấp dẫn và sự kiện đặc biệt tại Nova Souls
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 sm:mb-8 space-y-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Tìm kiếm sự kiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 sm:py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 bg-white/50 backdrop-blur-sm text-base"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                className="flex items-center gap-1 sm:gap-2 rounded-xl text-xs sm:text-sm px-3 py-2"
                size="sm"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Tất cả</span>
                <span className="xs:hidden">All</span>
              </Button>
              <Button
                variant={filterType === "promotion" ? "default" : "outline"}
                onClick={() => setFilterType("promotion")}
                size="sm"
                className="rounded-xl text-xs sm:text-sm px-3 py-2"
              >
                <span className="hidden xs:inline">Khuyến mãi</span>
                <span className="xs:hidden">Sale</span>
              </Button>
              <Button
                variant={filterType === "event" ? "default" : "outline"}
                onClick={() => setFilterType("event")}
                size="sm"
                className="rounded-xl text-xs sm:text-sm px-3 py-2"
              >
                <span className="hidden xs:inline">Sự kiện</span>
                <span className="xs:hidden">Event</span>
              </Button>
              <Button
                variant={filterType === "workshop" ? "default" : "outline"}
                onClick={() => setFilterType("workshop")}
                size="sm"
                className="rounded-xl text-xs sm:text-sm px-3 py-2"
              >
                <span className="hidden xs:inline">Workshop</span>
                <span className="xs:hidden">Class</span>
              </Button>
            </div>
          </div>

          {/* Featured Event */}
          {featuredEvent && (
            <Card className="mb-6 sm:mb-8 md:mb-12 overflow-hidden border-0 shadow-2xl animate-fade-up bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
                <div className="relative overflow-hidden h-48 sm:h-56 md:h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuredEvent.color} opacity-20`} />
                  <img
                    src={featuredEvent.image}
                    alt="Featured Event"
                    className="w-full h-full object-cover relative z-10"
                  />
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg text-xs sm:text-sm px-2 py-1">
                      ⭐ Nổi bật
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex gap-1 sm:gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                      onClick={() => toggleLike(featuredEvent.id)}
                    >
                      <Heart 
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          likedEvents.includes(featuredEvent.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'
                        }`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                      {featuredEvent.title}
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                      {featuredEvent.description}
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                      </div>
                      <span className="font-medium text-sm sm:text-base line-clamp-1">{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-foreground flex-wrap">
                      <div className="flex items-center gap-1">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                        </div>
                        <span className="font-medium text-sm sm:text-base">{featuredEvent.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                        </div>
                        <span className="text-muted-foreground text-sm sm:text-base">{featuredEvent.participants} người</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-fit shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base">
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* All Events */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredEvents.map((event, index) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-up group border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-10`} />
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                    {getTypeBadge(event.type)}
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex gap-1 sm:gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                      onClick={() => toggleLike(event.id)}
                    >
                      <Heart 
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          likedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'
                        }`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
                    </Button>
                  </div>
                  {event.discount && (
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full font-bold shadow-lg z-20 text-xs sm:text-sm">
                      -{event.discount}
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-base sm:text-lg font-bold line-clamp-2 leading-tight">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs sm:text-sm leading-relaxed">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 pb-2 sm:pb-3 px-3 sm:px-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                    <span className="font-medium truncate">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                    <span className="font-medium truncate">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                    <span className="font-medium line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                      <span className="font-medium">{event.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                      <span className="font-medium">{event.participants}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
                  <Button variant="outline" className="w-full rounded-xl hover:bg-accent hover:text-white transition-all duration-200 text-xs sm:text-sm py-2 sm:py-2.5">
                    Chi tiết
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Promo Codes Section */}
          <Card className="mt-6 sm:mt-8 md:mt-12 animate-fade-in bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl">
            <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-accent to-accent-light flex items-center justify-center shadow-lg">
                  <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">Mã giảm giá</CardTitle>
              <CardDescription className="text-sm sm:text-base">Sử dụng các mã này khi thanh toán</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="border-2 border-dashed border-accent/30 rounded-xl p-4 sm:p-6 text-center hover:border-accent hover:bg-accent/5 transition-all duration-200 cursor-pointer group">
                  <div className="p-2 sm:p-3 rounded-full bg-accent/10 w-fit mx-auto mb-2 sm:mb-3 group-hover:bg-accent/20 transition-colors">
                    <Percent className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <p className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">WELCOME20</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Mã giảm giá</p>
                </div>
                <div className="border-2 border-dashed border-accent/30 rounded-xl p-4 sm:p-6 text-center hover:border-accent hover:bg-accent/5 transition-all duration-200 cursor-pointer group">
                  <div className="p-2 sm:p-3 rounded-full bg-accent/10 w-fit mx-auto mb-2 sm:mb-3 group-hover:bg-accent/20 transition-colors">
                    <Percent className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <p className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">HAPPY15</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Mã giảm giá</p>
                </div>
                <div className="border-2 border-dashed border-accent/30 rounded-xl p-4 sm:p-6 text-center hover:border-accent hover:bg-accent/5 transition-all duration-200 cursor-pointer group sm:col-span-2 lg:col-span-1">
                  <div className="p-2 sm:p-3 rounded-full bg-accent/10 w-fit mx-auto mb-2 sm:mb-3 group-hover:bg-accent/20 transition-colors">
                    <Percent className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <p className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">FREESHIP</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Miễn phí giao hàng</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
