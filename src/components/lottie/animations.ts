// Animation URLs from LottieFiles CDN (free animations)
// These can be replaced with custom animations

export const ANIMATION_URLS = {
  // Rocket animations
  rocket: "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189572c9ac68/C6bSWjZo4Y.json",
  rocketLaunch: "https://lottie.host/b5d86c25-6f5c-4f62-8e68-9b7a2b5e3f8a/xhg0aYX8Xt.json",

  // Fire/flame for streaks
  fire: "https://lottie.host/5f5e1e7e-5a0a-4e3c-8f1e-2b3f4c5d6e7f/fire.json",
  flame: "https://lottie.host/e65af2d6-7f77-4a9a-9c5e-7f2f3a4b5c6d/flame.json",

  // Success/celebration
  confetti: "https://lottie.host/0a8e5f7c-3c4d-4e5f-8a9b-1c2d3e4f5a6b/confetti.json",
  celebration: "https://lottie.host/1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e/celebration.json",
  success: "https://lottie.host/2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f/success.json",
  checkmark: "https://lottie.host/3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a/checkmark.json",

  // Loading states
  loading: "https://lottie.host/4e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b/loading.json",
  spinner: "https://lottie.host/5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c/spinner.json",
  dots: "https://lottie.host/6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d/dots.json",

  // Empty states
  empty: "https://lottie.host/7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e/empty.json",
  noData: "https://lottie.host/8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f/nodata.json",

  // Misc
  star: "https://lottie.host/9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a/star.json",
  trophy: "https://lottie.host/0e1f2a3b-4c5d-6e7f-8a9b-0c1d2e3f4a5b/trophy.json",
  levelUp: "https://lottie.host/1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c/levelup.json",
};

// Inline animation data for critical animations that need to work offline
// These are minimal, hand-crafted animations

export const inlineAnimations = {
  // Simple pulsing circle for loading
  pulseLoader: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Pulse Loader",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Circle",
        sr: 1,
        ks: {
          o: { a: 1, k: [{ t: 0, s: [100] }, { t: 30, s: [40] }, { t: 60, s: [100] }] },
          s: { a: 1, k: [{ t: 0, s: [100, 100] }, { t: 30, s: [120, 120] }, { t: 60, s: [100, 100] }] },
          p: { a: 0, k: [50, 50] },
        },
        shapes: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [40, 40] },
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.788, 0.718, 0.42, 1] }, // Gold color
            o: { a: 0, k: 100 },
          },
        ],
      },
    ],
  },

  // Simple flame animation
  simpleFlame: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Flame",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Flame",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          s: { a: 1, k: [{ t: 0, s: [100, 100] }, { t: 15, s: [105, 110] }, { t: 30, s: [95, 105] }, { t: 45, s: [102, 108] }, { t: 60, s: [100, 100] }] },
          p: { a: 0, k: [50, 60] },
          r: { a: 1, k: [{ t: 0, s: [0] }, { t: 20, s: [-3] }, { t: 40, s: [3] }, { t: 60, s: [0] }] },
        },
        shapes: [
          {
            ty: "sh",
            ks: {
              a: 0,
              k: {
                c: true,
                v: [[0, 0], [-15, 25], [-10, 45], [0, 35], [10, 45], [15, 25]],
                i: [[0, 0], [-5, -10], [0, 5], [5, 5], [0, 5], [5, -10]],
                o: [[0, 0], [-5, 10], [-5, -5], [0, -5], [5, -5], [5, 10]],
              },
            },
          },
          {
            ty: "gf",
            o: { a: 0, k: 100 },
            s: { a: 0, k: [0, -20] },
            e: { a: 0, k: [0, 40] },
            t: 1,
            g: {
              p: 3,
              k: { a: 0, k: [0, 1, 0.8, 0, 0.5, 1, 0.5, 0, 1, 0.9, 0.3, 0] },
            },
          },
        ],
      },
    ],
  },

  // Simple rocket
  simpleRocket: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 100,
    h: 100,
    nm: "Rocket",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Rocket Body",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          p: { a: 1, k: [{ t: 0, s: [50, 70] }, { t: 45, s: [50, 40] }, { t: 90, s: [50, 70] }] },
          s: { a: 0, k: [100, 100] },
          r: { a: 0, k: -45 },
        },
        shapes: [
          {
            ty: "rc",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [20, 35] },
            r: { a: 0, k: 8 },
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.788, 0.718, 0.42, 1] },
            o: { a: 0, k: 100 },
          },
        ],
      },
    ],
  },

  // Checkmark success
  checkmark: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 40,
    w: 100,
    h: 100,
    nm: "Checkmark",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Check",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          p: { a: 0, k: [50, 50] },
          s: { a: 1, k: [{ t: 0, s: [0, 0] }, { t: 20, s: [110, 110] }, { t: 30, s: [100, 100] }] },
        },
        shapes: [
          {
            ty: "sh",
            ks: {
              a: 0,
              k: {
                c: false,
                v: [[-15, 0], [-5, 10], [15, -15]],
                i: [[0, 0], [0, 0], [0, 0]],
                o: [[0, 0], [0, 0], [0, 0]],
              },
            },
          },
          {
            ty: "st",
            c: { a: 0, k: [0.3, 0.8, 0.4, 1] },
            o: { a: 0, k: 100 },
            w: { a: 0, k: 6 },
            lc: 2,
            lj: 2,
          },
        ],
      },
    ],
  },

  // Three dots loading
  dotsLoading: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 40,
    nm: "Dots",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Dot 1",
        sr: 1,
        ks: {
          o: { a: 1, k: [{ t: 0, s: [100] }, { t: 15, s: [30] }, { t: 30, s: [100] }] },
          p: { a: 0, k: [25, 20] },
          s: { a: 1, k: [{ t: 0, s: [100, 100] }, { t: 15, s: [70, 70] }, { t: 30, s: [100, 100] }] },
        },
        shapes: [{ ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [12, 12] } }, { ty: "fl", c: { a: 0, k: [0.788, 0.718, 0.42, 1] }, o: { a: 0, k: 100 } }],
      },
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: "Dot 2",
        sr: 1,
        ks: {
          o: { a: 1, k: [{ t: 10, s: [100] }, { t: 25, s: [30] }, { t: 40, s: [100] }] },
          p: { a: 0, k: [50, 20] },
          s: { a: 1, k: [{ t: 10, s: [100, 100] }, { t: 25, s: [70, 70] }, { t: 40, s: [100, 100] }] },
        },
        shapes: [{ ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [12, 12] } }, { ty: "fl", c: { a: 0, k: [0.788, 0.718, 0.42, 1] }, o: { a: 0, k: 100 } }],
      },
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: "Dot 3",
        sr: 1,
        ks: {
          o: { a: 1, k: [{ t: 20, s: [100] }, { t: 35, s: [30] }, { t: 50, s: [100] }] },
          p: { a: 0, k: [75, 20] },
          s: { a: 1, k: [{ t: 20, s: [100, 100] }, { t: 35, s: [70, 70] }, { t: 50, s: [100, 100] }] },
        },
        shapes: [{ ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [12, 12] } }, { ty: "fl", c: { a: 0, k: [0.788, 0.718, 0.42, 1] }, o: { a: 0, k: 100 } }],
      },
    ],
  },
};
