
export interface ICR_Counselor {
	SEQ: number;
	UNIQUE_ID: string;
	NAME: string;
	PHONE: string;
	TYPE: string;
	PASSWORD: string;
	WRTDATE: Date;
	MODDATE: Date;
	ETC1: string;
	ETC2: string;
	ETC3: string;
}

export interface ICR_CounselorList {
	SEQ: number;
	COUNSELOR_ID: string;
	STATUS: string;
	WRTDATE: Date;
	MODDATE: Date;
	ETC1: string;
	ETC2: string;
	ETC3: string;
}

export interface ICR_UserList {
	SEQ: number;
	USER_ID: string;
	STATUS: string;
	WRTDATE: Date;
	MODDATE: Date;
	ETC1: string;
	ETC2: string;
	ETC3: string;	
}

export interface ICR_RoomList {
	SEQ: number;
	USER_ID: string;
	COUNSELOR_ID: string;
	STATUS: string;
	WRTDATE: Date;
	MODDATE: Date;
	ETC1: string;
	ETC2: string;
	ETC3: string;		
}

export interface ICR_ChatHistory {
	SEQ: number;
	ROOM_SEQ: number;
	CHAT_SEQ: number;
	USER_ID: string;
	COUNSELOR_ID: string;
	TYPE: string;
	CONTENTS: string;
	WRTDATE: Date;
	ETC1: string;
	ETC2: string;
	ETC3: string;	
}