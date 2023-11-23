// import JSEncrypt from "jsencrypt"
import { JSEncrypt } from "encryptlong"
import prefix from "@/api/prefix"

export function createdRsa(requestUtl: any) {
	let uuid = ""
	let uuid2 = ""
	for (let i = 0; i < 10; i++) {
		uuid += parseInt(String(Math.random() * 10))
	}
	for (let i = 0; i < 1; i++) {
		uuid2 += parseInt(String(Math.random() * 10))
	}
	const crypt = new JSEncrypt()
	crypt.setKey(
		"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQQgenpDZwfTUmR4jLm4xg6EWkJoOvNDempE3ZWGCtuJW23snS5m44YsT+4eY/ZdyQSMfsxQ9ErTrY5FlwbwaLK2yP8lGZCBL8NEyZVh5gUZpasuGi06r1iZQXZ9L4MDD10KjY5YB7rPg+8SrFkUSATf8Ha1wlhq4RB2PjCDnamQIDAQAB"
	)
	// @ts-ignore
	let code: any = crypt.encryptLong(
		requestUtl.slice(prefix.length) + "," + String(new Date().getTime() + uuid)
	)
	code = code.split("")
	code.splice(7, 0, uuid2)
	code = code.join("")
	return code
}
