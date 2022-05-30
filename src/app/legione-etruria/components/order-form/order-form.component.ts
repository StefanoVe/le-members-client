import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addMonths } from 'date-fns';
import { GroupOrder } from '../../../models/group-order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Input() hideElements: (
    | 'shops'
    | 'submit'
    | 'orderNotes'
    | 'startDate'
    | 'dueDate'
  )[] = [];
  @Input() loading = false;
  @Input() orderData?: GroupOrder;
  @Output() submitted = new EventEmitter<Partial<GroupOrder>>();

  public form!: FormGroup;

  public shopsDropdown = [
    {
      label: 'Il Semaforo',
      value: 'ilsemaforo',
    },
    {
      label: 'Taiwangun',
      value: 'taiwangun',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      shops: new FormControl(this.orderData?.shops || [], [
        Validators.required,
      ]),
      startDate: new FormControl(
        this.orderData?.startDate || new Date().toISOString(),
        [Validators.required]
      ),
      dueDate: new FormControl(
        this.orderData?.dueDate || addMonths(new Date(), 1).toISOString(),
        [Validators.required]
      ),
      orderNotes: new FormControl(this.orderData?.orderNotes || '', []),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted.emit(this.form.value);
  }
}
