import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { DAFF_IMAGE_COMPONENTS } from '@daffodil/design/image';
import { DaffMediaGalleryModule } from '@daffodil/design/media-gallery';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mismatched-sizes-media-gallery',
  templateUrl: './mismatched-sizes-media-gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DaffMediaGalleryModule,
    DAFF_IMAGE_COMPONENTS,
  ],
})
export class MismatchedSizesMediaGalleryComponent {}
