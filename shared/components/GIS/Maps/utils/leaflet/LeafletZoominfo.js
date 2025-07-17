import L from 'leaflet';
import './LeafletZoominfo.css';

L.Control.Zoominfo = (() => {
  return L.Control.extend({
    options: {
      position: 'bottomright',
      styleNS: 'leaflet-control-zoominfo',
    },

    onAdd(map) {
      this._map = map;
      this._ui = this._createUI();

      map.whenReady(this._initInfo, this)
        .whenReady(this._initEvents, this)
        .whenReady(this._updateInfoValue, this)
        .whenReady(this._updateDisabled, this);
      return this._ui.bar;
    },

    onRemove(map) {
      map.off('zoomlevelschange', this._updateSize, this)
        .off('zoomend zoomlevelschange', this._updateInfoValue, this)
        .off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    _createUI() {
      const ui = {};
      const ns = this.options.styleNS;

      ui.bar = L.DomUtil.create('div', `${ns} leaflet-bar`);
      ui.zoomIn = this._createZoomBtn('in', 'top', ui.bar);
      ui.wrap = L.DomUtil.create('div', `${ns}-wrap leaflet-bar-part`, ui.bar);
      ui.zoomOut = this._createZoomBtn('out', 'bottom', ui.bar);
      ui.body = L.DomUtil.create('div', `${ns}-body`, ui.wrap);
      ui.info = L.DomUtil.create('div', `${ns}-info`);

      L.DomEvent.disableClickPropagation(ui.bar);
      L.DomEvent.disableClickPropagation(ui.info);

      return ui;
    },
    _createZoomBtn(zoomDir, end, container) {
      const classDef = `${this.options.styleNS}-${zoomDir} leaflet-bar-part leaflet-bar-part-${end}`;
      const link = L.DomUtil.create('a', classDef, container);

      link.href = '#';
      link.title = `Zoom ${zoomDir}`;

      L.DomEvent.on(link, 'click', L.DomEvent.preventDefault);

      return link;
    },

    _initInfo() {
      this._ui.body.appendChild(this._ui.info);
    },
    _initEvents() {
      this._map
        .on('zoomend zoomlevelschange', this._updateInfoValue, this)
        .on('zoomend zoomlevelschange', this._updateDisabled, this);

      L.DomEvent.on(this._ui.zoomIn, 'click', this._zoomIn, this);
      L.DomEvent.on(this._ui.zoomOut, 'click', this._zoomOut, this);
    },

    _zoomIn(e) {
      this._map.zoomIn(e.shiftKey ? 3 : 1);
    },
    _zoomOut(e) {
      this._map.zoomOut(e.shiftKey ? 3 : 1);
    },

    _zoomLevels() {
      const zoomLevels = this._map.getMaxZoom() - this._map.getMinZoom() + 1;
      return zoomLevels < Infinity ? zoomLevels : 0;
    },
    _toZoomLevel(value) {
      return value + this._map.getMinZoom();
    },
    _toValue(zoomLevel) {
      return zoomLevel - this._map.getMinZoom();
    },

    _updateInfoValue() {
      this._ui.info.innerHTML = `<strong>${this._map.getZoom()}</strong>`;
    },
    _updateDisabled() {
      const zoomLevel = this._map.getZoom();
      const className = `${this.options.styleNS}-disabled`;

      L.DomUtil.removeClass(this._ui.zoomIn, className);
      L.DomUtil.removeClass(this._ui.zoomOut, className);

      if (zoomLevel === this._map.getMinZoom()) {
        L.DomUtil.addClass(this._ui.zoomOut, className);
      }
      if (zoomLevel === this._map.getMaxZoom()) {
        L.DomUtil.addClass(this._ui.zoomIn, className);
      }
    },
  });
})();

// eslint-disable-next-line func-names
L.Map.addInitHook(function () {
  if (this.options.zoominfoControl) {
    this.zoominfoControl = new L.Control.Zoominfo();
    this.addControl(this.zoominfoControl);
  }
});

L.control.zoominfo = options => {
  return new L.Control.Zoominfo(options);
};
