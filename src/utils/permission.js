export default class Permission {
    static check(base, required) {
        required = typeof required === "number" ? required : perms[required]
        if(typeof required !== "number" && !required) throw new Error('올바르지 않은 권한입니다.')
        return (base & required) === required
    }
}

const perms = {
  general: 0x0,
  staff: 0x1,
  bughunter: 0x2,
  booster: 0x4
}