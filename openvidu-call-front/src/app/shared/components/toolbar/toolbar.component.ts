import { Component, OnInit, Input, EventEmitter, Output, HostListener, OnDestroy } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { VideoFullscreenIcon } from '../../types/icon-type';
import { OvSettingsModel } from '../../models/ovSettings';
import { ChatService } from '../../services/chat/chat.service';
import { Subscription } from 'rxjs/internal/Subscription';
//Add this
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
	@Input() lightTheme: boolean;
	@Input() mySessionId: boolean;
	@Input() compact: boolean;
	@Input() showNotification: boolean;
	@Input() ovSettings: OvSettingsModel;

	@Input() isWebcamVideoEnabled: boolean;
	@Input() isWebcamAudioEnabled: boolean;
	@Input() isScreenEnabled: boolean;
	@Input() isAutoLayout: boolean;
	@Input() isConnectionLost: boolean;
	@Input() hasVideoDevices: boolean;
	@Input() hasAudioDevices: boolean;
	@Output() micButtonClicked = new EventEmitter<any>();
	@Output() camButtonClicked = new EventEmitter<any>();
	@Output() screenShareClicked = new EventEmitter<any>();
	@Output() layoutButtonClicked = new EventEmitter<any>();
	@Output() leaveSessionButtonClicked = new EventEmitter<any>();

	newMessagesNum: number;
	private chatServiceSubscription: Subscription;
	//Add this
	username: string;
	isTeacher: boolean;

	fullscreenIcon = VideoFullscreenIcon.BIG;
	logoUrl = 'https://raw.githubusercontent.com/OpenVidu/openvidu-call/master/openvidu-call-front/src/assets/images/';

	participantsNames: string[] = [];

	constructor(private utilsSrv: UtilsService, private chatService: ChatService
		//Add this
		, private route: ActivatedRoute
		) {
		this.chatServiceSubscription = this.chatService.messagesUnreadObs.subscribe((num) => {
			this.newMessagesNum = num;
		});
	}
	ngOnDestroy(): void {
		this.chatServiceSubscription.unsubscribe();
	}

	@HostListener('window:resize', ['$event'])
	sizeChange(event) {
		const maxHeight = window.screen.height;
		const maxWidth = window.screen.width;
		const curHeight = window.innerHeight;
		const curWidth = window.innerWidth;
		if (maxWidth !== curWidth && maxHeight !== curHeight) {
			this.fullscreenIcon = VideoFullscreenIcon.BIG;
		}
	}

	ngOnInit() {
		if (this.lightTheme) {
			this.logoUrl += 'openvidu_logo_grey.png';
			return;
		}
		this.logoUrl += 'openvidu_logo.png';
		
		//Add this
		this.username = this.route.snapshot.queryParamMap.get('usr');
		if (this.route.snapshot.queryParamMap.get('tchr') === "true"){
			this.isTeacher = true;
		}
		else{
			this.isTeacher = false;
		}
	}

	toggleMicrophone() {
		this.micButtonClicked.emit();
	}

	toggleCamera() {
		this.camButtonClicked.emit();
	}

	toggleScreenShare(){
		this.screenShareClicked.emit();
	}

	openWhiteboard(){
		window.open("https://r7.whiteboardfox.com/");
	}

	toggleSpeakerLayout() {
		this.layoutButtonClicked.emit();
	}

	leaveSession() {
		this.leaveSessionButtonClicked.emit();
	}

	toggleChat() {
		this.chatService.toggleChat();
	}

	toggleFullscreen() {
		this.utilsSrv.toggleFullscreen('videoRoomNavBar');
		this.fullscreenIcon = this.fullscreenIcon === VideoFullscreenIcon.BIG ? VideoFullscreenIcon.NORMAL : VideoFullscreenIcon.BIG;
	}
}
