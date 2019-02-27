/**
 * Created by orjanertkjern on 15/12/2017.
 */
import { trigger, state, animate, transition, style } from '@angular/animations';

export const slide =
  trigger(
    'slide',
    [
      transition(
        ':enter', [
          style({transform: 'translateX(200%)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(-100%)', 'opacity': 1}))
        ]
      )]
  );
