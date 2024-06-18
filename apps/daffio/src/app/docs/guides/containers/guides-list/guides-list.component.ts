import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { DaffDocsNavList } from '@daffodil/docs-utils';

import { DaffioDocsListComponent } from '../../../components/docs-list/docs-list.component';
import { DaffioDoc } from '../../../models/doc';
import { DaffioDocsService } from '../../../services/docs.service';


@Component({
  selector: 'daffio-docs-guides-list-container',
  templateUrl: './guides-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    DaffioDocsListComponent,
  ],
})
export class DaffioDocsGuidesListContainer implements OnInit {
  guidesList$: Observable<DaffDocsNavList>;

  constructor(
    private docService: DaffioDocsService<DaffioDoc>,
  ) {}

  ngOnInit() {
    this.guidesList$ = this.docService.getGuidesList();
  }
}
