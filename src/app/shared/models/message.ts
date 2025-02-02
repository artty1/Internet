export class MessageTrader{
    public expired: string = "ทะเบียนผู้ประกอบการหมดอายุ กรุณาติดต่อเจ้าหน้าที่****";
}
// ---------------------------------------------------------------
export class MessageRenew{
    public initial: string = "กำลังสร้างคำร้องขอต่ออายุ...";
    public license_not_found: string = "ไม่พบใบอนุญาตที่ต้องการต่ออายุ กรุณา refresh ข้อมูลอีกครั้ง";
    public license_expired: string = "ไม่สามารถต่อใบอนุญาตได้เนื่องจากใบอนุญาตหมดอายุแล้ว";
    public license_not_in_period: string = "ใบอนุญาตนี้ไม่อยู่ในช่วงเวลาที่สามารถต่อใบอนุญาตได้";
    public confirm_any_request_in_system: string = "ใบอนุญาตมีการดำเนินการต่ออายุแล้ว ยังต้องการดำเนินการขอต่ออายุหรือไม่";
}
// ---------------------------------------------------------------
export class MessageSubstitue{
    public initial: string = "กำลังสร้างคำร้องขอออกใบแทน..."
    public license_not_found: string = "ไม่พบใบอนุญาตที่ต้องการออกใบแทน กรุณา refresh ข้อมูลอีกครั้ง"
    public license_expired: string = "ไม่สามารถต่อใบอนุญาตได้เนื่องจากใบอนุญาตหมดอายุแล้ว"
    public confirm_any_request_in_system: string = "ใบอนุญาตนี้มีการดำเนินการขอออกใบแทนแล้ว ยังต้องการดำเนินการขอออกใบแทนต่อหรือไม่"
}
// ---------------------------------------------------------------
export class MessageDraftDelete{
    public confirm: string = "คุณต้องการลบแบบร่างคำขอหรือไม่"
    public deleting: string = "กำลังลบแบบร่างคำขอ..."
    public delete_success: string = "ลบแบบร่างคำขอเรียบร้อยแล้ว"
    public draft_not_found: string = "ไม่พบข้อมูลคำขอที่ต้องการยื่น"
    public draft_submited: string = "คำขอนี้ถูกยื่นเรื่องไปเรียบร้อยแล้ว"
}
// ---------------------------------------------------------------
export class MessageDraft{
    public initial: string = "กำลังสร้างคำขอ"
    public saving: string = "กำลังบันทึกแบบร่างคำขอ"
    public save_success: string = "บันทึกแบบร่างเรียบร้อย"
    public draft_not_found: string = "ไม่พบข้อมูลที่ต้องการแก้ไข"
    public delete:MessageDraftDelete = new MessageDraftDelete();
}
// ---------------------------------------------------------------
export class Message {

    public server_error:string = "เกิดข้อผิดพลาดของระบบ กรุณาลองอีกครั้ง"
    public disconnect: string = "เกิดข้อผิดพลาดของการเชื่อมต่อระบบอินเตอร์เน็ต กรุณาลองอีกครั้ง"
    public initial_error: string = "เกิดข้อผิดพลาดของระบบหรือการเชื่อมต่ออินเตอร์เน็ต"

    public trader: MessageTrader = new MessageTrader();
    public renew: MessageRenew = new MessageRenew();
    public substitue:MessageSubstitue = new MessageSubstitue();
    public draft: MessageDraft = new MessageDraft();
      
}
// ---------------------------------------------------------------