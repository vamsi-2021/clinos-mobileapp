#import <React/RCTView.h>

// In RN 0.77 new arch mode the legacy interop can create plain RCTView instances
// for view managers whose -view method is gated behind #else (old arch only).
// This category maps the iOS 26 color-system call to the closest UIKit equivalent.
@implementation RCTView (NewArchLegacyInteropFix)

- (void)setColor:(UIColor *)color {
  self.tintColor = color;
}

@end
