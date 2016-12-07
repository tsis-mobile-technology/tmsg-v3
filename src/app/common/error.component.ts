import { Component } from '@angular/core';

@Component({
    selector: 'app-error-message',
    templateUrl: './app/common/error.component.html',
})

export class ErrorComponent
{
    private ErrorMsg: string;
    public ErrorMessageIsVisible: boolean;

    showErrorMessage(msg: string)
    {
        this.ErrorMsg = msg;
        this.ErrorMessageIsVisible = true;
    }

    hideErrorMsg()
    {
        this.ErrorMessageIsVisible = false;
    }
}