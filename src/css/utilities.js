export default function utilities(renderStatic) {
  renderStatic(`
    .u-hiddenVisually {
      border: 0 !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      height: 1px !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: absolute !important;
      width: 1px !important;
    }
  `);
}
