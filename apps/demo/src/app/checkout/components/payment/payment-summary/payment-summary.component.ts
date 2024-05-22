import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'demo-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss'],
  standalone: true,
})
export class PaymentSummaryComponent {

  @Input() paymentInfo: any;
  @Output() editPaymentInfo: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onEdit() {
    this.editPaymentInfo.emit();
  }
}
