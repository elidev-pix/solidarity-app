import {
  Map,
  MapArc,
  MapMarker,
  MarkerContent,
  MarkerLabel,
} from "./ui/map";

const hub = { name: "Burkina Faso", lng: -1.5339, lat: 12.2383};

const destinations = [
  { name: "Côte d'ivoire", lng: -5.5471, lat: 7.5400 }
];

// Suppression du "as [number, number]" pour le rendre valide en JavaScript pur
const arcs = destinations.map((dest) => ({
  id: dest.name,
  from: [hub.lng, hub.lat],
  to: [dest.lng, dest.lat],
}));

export function Arc() {
  return (
    <div className="relative h-[500px] w-full max-w-7xl mx-auto">
      <Map
  className="h-full w-full"
  center={[hub.lng, hub.lat]}
  zoom={3}
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
>
        <MapArc
          data={arcs}
          paint={{
            "line-color": "#3b82f6",
            "line-dasharray": [2, 2],
          }}
          interactive={false}
        />

        <MapMarker longitude={hub.lng} latitude={hub.lat}>
          <MarkerContent>
            <div className="size-3 rounded-full border-2 border-white bg-blue-500" />
            <MarkerLabel
              position="top"
              className="bg-background/80 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur"
            >
              {hub.name}
            </MarkerLabel>
          </MarkerContent>
        </MapMarker>

        {destinations.map((dest) => (
          <MapMarker key={dest.name} longitude={dest.lng} latitude={dest.lat}>
            <MarkerContent>
              <div className="size-2 rounded-full border-2 border-white bg-blue-500" />
              <MarkerLabel position="top">{dest.name}</MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

export default Arc;