import React from "react";

function MapExample() {
  // const mapRef = React.useRef(null);
  // React.useEffect(() => {
  //   let google = window.google;
  //   let map = mapRef.current;
  //   let lat = "40.748817";
  //   let lng = "-73.985428";
  //   const myLatlng = new google.maps.LatLng(lat, lng);
  //   const mapOptions = {
  //     zoom: 12,
  //     center: myLatlng,
  //     scrollwheel: false,
  //     zoomControl: true,
  //     styles: [
  //       {
  //         featureType: "administrative",
  //         elementType: "labels.text.fill",
  //         stylers: [{ color: "#444444" }],
  //       },
  //       {
  //         featureType: "landscape",
  //         elementType: "all",
  //         stylers: [{ color: "#f2f2f2" }],
  //       },
  //       {
  //         featureType: "poi",
  //         elementType: "all",
  //         stylers: [{ visibility: "off" }],
  //       },
  //       {
  //         featureType: "road",
  //         elementType: "all",
  //         stylers: [{ saturation: -100 }, { lightness: 45 }],
  //       },
  //       {
  //         featureType: "road.highway",
  //         elementType: "all",
  //         stylers: [{ visibility: "simplified" }],
  //       },
  //       {
  //         featureType: "road.arterial",
  //         elementType: "labels.icon",
  //         stylers: [{ visibility: "off" }],
  //       },
  //       {
  //         featureType: "transit",
  //         elementType: "all",
  //         stylers: [{ visibility: "off" }],
  //       },
  //       {
  //         featureType: "water",
  //         elementType: "all",
  //         stylers: [{ color: "#cbd5e0" }, { visibility: "on" }],
  //       },
  //     ],
  //   };

  //   map = new google.maps.Map(map, mapOptions);

  //   const marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map,
  //     animation: google.maps.Animation.DROP,
  //     title: "Notus NextJS!",
  //   });

  //   const contentString =
  //     '<div class="info-window-content"><h2>Notus NextJS</h2>' +
  //     "<p>A free Admin for Tailwind CSS, React, React Hooks, and NextJS.</p></div>";

  //   const infowindow = new google.maps.InfoWindow({
  //     content: contentString,
  //   });

  //   google.maps.event.addListener(marker, "click", function () {
  //     infowindow.open(map, marker);
  //   });
  // });
  return (
    <>
      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full"  />
      </div>
    </>
  );
}

export default MapExample;
