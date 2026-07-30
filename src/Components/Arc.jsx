import {
  Map,
  MapArc,
  MapMarker,
  MarkerContent,
  MarkerLabel,
} from "./ui/map";

const hub = { name: "Ouagadougou", lng: -1.5339, lat: 12.3714 };

const destinations = [
  { name: "Abidjan", lng: -4.0083, lat: 5.3599 },
  {name: "Koudougou", lng:-2.343437380798104, lat: 12.258411202352654}
];

const arcs = destinations.map((dest) => ({
  id: dest.name,
  from: [hub.lng, hub.lat],
  to: [dest.lng, dest.lat],
}));

export function Arc() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16 px-4">
      <div className="text-center max-w-2xl">
        <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
          Notre rayonnement régional
        </span>
        <p className="mt-4 text-gray-600 leading-7">
          Depuis le Burkina Faso, nos actions solidaires s'étendent au-delà des frontières
          pour toucher les communautés vulnérables de la sous-région.
        </p>
      </div>

      <div className="relative h-[500px] w-full max-w-7xl rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white">
        <Map
          className="h-full w-full"
          center={[hub.lng, hub.lat]}
          zoom={4}
          style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          <MapArc
            data={arcs}
            paint={{
              "line-color": "#D6336C",
              "line-width": 2.5,
              "line-opacity": 0.85,
              "line-dasharray": [2, 2],
            }}
            interactive={false}
          />

          <MapMarker longitude={hub.lng} latitude={hub.lat}>
            <MarkerContent>
              <div className="size-3 rounded-full border-2 border-white bg-[#D6336C] shadow-md" />
              <MarkerLabel
                position="top"
                className="bg-white/90 rounded-full px-2.5 py-1 text-md font-bold font-jakarta text-[#D6336C] shadow-sm backdrop-blur"
              >
                {hub.name}
              </MarkerLabel>
            </MarkerContent>
          </MapMarker>

          {destinations.map((dest) => (
            <MapMarker key={dest.name} longitude={dest.lng} latitude={dest.lat}>
              <MarkerContent>
                <div className="size-2.5 rounded-full border-2 border-white bg-[#B36CB2] shadow-md" />
                <MarkerLabel
                  position=""
                  className="bg-white/90 rounded-full px-2.5 py-1 text-xs font-bold font-jakarta text-[#B36CB2] shadow-sm backdrop-blur"
                >
                  {dest.name}
                </MarkerLabel>
              </MarkerContent>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );
}

export default Arc;