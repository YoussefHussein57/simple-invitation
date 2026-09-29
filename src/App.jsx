import { AmbientScore } from "./components/AmbientScore";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { Greeting } from "./components/Greeting";
import { InvitationCard } from "./components/InvitationCard";
import { Countdown } from "./components/Countdown";
import { Location } from "./components/Location";
import { Keepsake } from "./components/Keepsake";
import { RSVP } from "./components/RSVP";
import { FinalSeal } from "./components/FinalSeal";

// SEALED WITH LOVE — the letter is the site. No navbar, no footer,
// no generic wedding-template chrome; each section is a scene from
// the same stationery suite, in order.
export default function App() {
  return (
    <main>
      <AmbientScore />
      <EnvelopeIntro />
      <Greeting />
      <InvitationCard />
      <Countdown />
      <Location />
      <Keepsake />
      <RSVP />
      <FinalSeal />
    </main>
  );
}
