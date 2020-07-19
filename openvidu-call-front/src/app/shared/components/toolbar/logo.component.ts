import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-toolbar-logo',
	template: `
		<div id="navSessionInfo">
			<div *ngIf="!compact && sessionId" [ngClass]="{'titleContent': true, 'titleContentLight': lightTheme, 'titleContentDark': !lightTheme}">
				<span id="session-title">{{ sessionId }}</span>
			</div>
		</div>
	`,
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarLogoComponent {
	@Input() lightTheme: boolean;
	@Input() compact: boolean;
	@Input() sessionId: string;

	constructor() {}
}
