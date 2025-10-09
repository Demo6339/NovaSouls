import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, Award, Heart } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    role: "Khách hàng thân thiết",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    content: "Cà phê ở Nova Souls thực sự đặc biệt! Hương vị đậm đà, không gian ấm cúng và nhân viên phục vụ rất chuyên nghiệp. Tôi đã trở thành khách hàng thường xuyên từ 2 năm nay.",
    date: "2 ngày trước",
    visitCount: "50+ lần"
  },
  {
    id: 2,
    name: "Trần Văn Hùng",
    role: "Food Blogger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    content: "Thực đơn đa dạng và chất lượng tuyệt vời! Đặc biệt là bánh croissant và tiramisu, được làm rất tinh tế. Không gian cũng rất đẹp để chụp ảnh.",
    date: "1 tuần trước",
    visitCount: "30+ lần"
  },
  {
    id: 3,
    name: "Lê Thị Mai",
    role: "Sinh viên",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    content: "Không gian học tập lý tưởng với wifi ổn định và đồ uống giá cả hợp lý. Tôi thường đến đây để ôn thi cùng bạn bè. Cà phê Americano rất ngon!",
    date: "3 ngày trước",
    visitCount: "25+ lần"
  },
  {
    id: 4,
    name: "Phạm Đức Thành",
    role: "Doanh nhân",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    content: "Tôi thường tổ chức các cuộc họp kinh doanh tại đây. Không gian yên tĩnh, đồ uống chất lượng cao và dịch vụ chuyên nghiệp. Rất phù hợp cho công việc.",
    date: "5 ngày trước",
    visitCount: "40+ lần"
  },
  {
    id: 5,
    name: "Hoàng Thị Lan",
    role: "Nghệ sĩ",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    content: "Nova Souls là nơi tôi tìm thấy cảm hứng sáng tạo. Không gian đẹp, âm nhạc nhẹ nhàng và cà phê ngon. Tôi đã sáng tác nhiều tác phẩm tại đây.",
    date: "1 tuần trước",
    visitCount: "35+ lần"
  },
  {
    id: 6,
    name: "Võ Minh Tuấn",
    role: "Du khách",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    content: "Lần đầu đến TP.HCM, tôi được bạn giới thiệu Nova Souls. Thực sự ấn tượng với chất lượng cà phê và không gian. Sẽ quay lại lần sau!",
    date: "4 ngày trước",
    visitCount: "Lần đầu"
  }
];

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          i < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background to-secondary/10">
      <div className="container px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Heart className="h-4 w-4" />
              Đánh giá khách hàng
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
              Những phản hồi chân thực từ khách hàng đã trải nghiệm dịch vụ của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-2xl transition-all duration-500 animate-fade-up bg-white/90 backdrop-blur-sm hover:bg-white hover:-translate-y-2 border-0 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    <Award className="h-3 w-3" />
                    {testimonial.visitCount}
                  </div>
                </div>
                
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-accent/30 mb-3" />
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base italic">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-muted/50">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground text-sm sm:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>

          {/* Stats */}
          <div className="mt-16 bg-gradient-to-r from-accent/5 to-primary/5 rounded-3xl p-8 border border-accent/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">4.9/5</div>
                <div className="text-muted-foreground text-sm">Đánh giá trung bình</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">2,500+</div>
                <div className="text-muted-foreground text-sm">Khách hàng hài lòng</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">98%</div>
                <div className="text-muted-foreground text-sm">Khách hàng quay lại</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
