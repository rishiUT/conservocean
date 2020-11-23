import React from "react";

export default function InstancePageContainer(props: any) {
  return (
    <div className="bg-light full-height">
      <main className="container py-4">{props.children}</main>
    </div>
  );
}
