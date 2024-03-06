import { IMenu, IPolicy, IFood } from "../_types_";

export const menus: IMenu[] = [
  { name: 'About us', url: '#' },
  { name: 'Search Ticket', url: '#' },
  { name: 'Privacy', url: '#' },
  { name: 'Terms of use', url: '#' },
  { name: 'Career', url: '#' },
  { name: 'Customer Service', url: '#' },
]

export const cities: string[] = [
  "Đà Nẵng", "Sài Gòn" , "Hà Nội"
]

export const policies: IPolicy[] = [
  { name: "Chính sách huỷ vé", item: ["Chỉ được chuyển đổi vé 1 lần duy nhất", "Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian hủy vé so với giờ khởi hành ghi trên vé và số lượng vé cá nhân/tập thể áp dụng theo các quy định hiện hành", "Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã thanh toán, cần liên hệ với Trung tâm tổng đài 1900 6067 hoặc quầy vé chậm nhất trước 24h so với giờ xe khởi hành được ghi trên vé, trên email hoặc tin nhắn để được hướng dẫn thêm"] },
  { name: "Yêu cầu khi lên xe", item: ["Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp) trước 30 phút để làm thủ tục lên xe (đối với ngày lễ tết cần ra trước 60 phút).", "Xuất trình thông tin vé được gửi qua SMS/Email/Futa App hoặc liên hệ quầy vé để nhận thông tin vé trước khi lên xe.", "Không mang thức ăn/đồ uống có mùi lên xe.", "Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử dụng chất kích thích trên xe.", "Không mang các vật dễ cháy nổ lên xe.", "Không vứt rác trên xe.", "Không mang động vật lên xe."] },
  { name: "Hành lý xách tay", item: ["Tổng trọng lượng hành lý không vượt quá 20kg", "Không vận chuyển hàng hoá cồng kềnh"] },
  { name: "Trẻ em dưới 6 tuổi và phụ nữ có thai", item: ["Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng dưới 30kg thì không phải mua vé.", "Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí trên sẽ mua 01 vé tương đương với người lớn.", "Mỗi người lớn sẽ đi kèm tối đa một trẻ em.", "Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá trình di chuyển."] },
  { name: "Vé đón đường", item: ["Trường hợp có nhu cầu lên xe dọc đường, Quý khách vui lòng liên hệ tổng đài 19006067 để đăng kí trước ít nhất 2 tiếng so với giờ xe khởi hành và vui lòng chuẩn bị hành lý nhỏ gọn (tối đa 20kg).", "Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm thuận tiện nằm trên lộ trình"] },

]