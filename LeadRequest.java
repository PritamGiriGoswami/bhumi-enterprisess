public class LeadRequest {
    private final String name;
    private final String phone;
    private final String service;
    private final String message;

    public LeadRequest(String name, String phone, String service, String message) {
        this.name = clean(name);
        this.phone = clean(phone);
        this.service = clean(service);
        this.message = clean(message);
    }

    public boolean isValid() {
        return !name.isBlank() && !phone.isBlank() && !service.isBlank();
    }

    public String summary() {
        return "LeadRequest{name='" + name + "', phone='" + phone + "', service='" + service + "'}";
    }

    private static String clean(String value) {
        return value == null ? "" : value.trim();
    }

    public static void main(String[] args) {
        LeadRequest demo = new LeadRequest("Client Name", "+91 98765 43210", "House mapping", "Need a 2-floor plan");
        System.out.println(demo.isValid() ? demo.summary() : "Lead request is incomplete");
    }
}
