import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  DaffTreeData,
  DAFF_TREE_COMPONENTS,
} from '@daffodil/design/tree';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'basic-tree',
  templateUrl: './basic-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DAFF_TREE_COMPONENTS,
    RouterLink,
  ],
})
export class BasicTreeComponent {
  tree: DaffTreeData<unknown> = {
    title: 'Root',
    items: [
      {
        title: 'Example Children',
        items: [
          { title: 'Example Child', url: '#', id: '', items: [], data: {}},
        ],
        url: '#',
        id: '',
        data: {},
      },
      {
        title: 'Example Link',
        items: [],
        url: '#',
        id: '',
        data: {},
      },
    ],
    url: '',
    id: '',
    data: {},
  };
}
