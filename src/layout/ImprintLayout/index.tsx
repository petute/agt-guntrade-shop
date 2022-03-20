import {
  Heading,
  Container,
  useColorModeValue,
  Box,
  Flex,
  Text,
  Center,
  Link,
} from '@chakra-ui/react'
import {BaseLayout} from '../BaseLayout'
import {BannerLayout} from '../BannerLayout'
import {ImprintContactLayout} from '../ImprintContactLayout'
import {ImprintLegalLayout} from '../ImprintLegalLayout'
import {ImprintTermsLayout} from '../ImprintTermsLayout'
import {GoogleMaps} from '../GoogleMapsLayout'


export const ImprintLayout = (props: {activePath: string}) => {
  return (
    <BaseLayout withSearch={true} activePath={props.activePath}>
      <BannerLayout title='Impressum' path={props.activePath} />
      <Container
        as="section"
        maxW="8xl"
        pt="6"
        id="featuredproducts"
        bg={useColorModeValue('white', 'gray.700')}
        borderWidth="1px"
        my={{base: 4, md: 8}}
        px={4}
        py={4}
        borderRadius="lg">
        {/* <Heading as="h1" size="lg" fontWeight="extrabold" >
          Impressum
        </Heading> */}
        <ImprintContactLayout
          heading={<p>AGT Gun Trade KG</p>}
          contact={
            <>
              <p>Hauptsitz Ried im Innkreis</p>
              <p>Wildfellnerstraße 22/1</p>
              <p>4910, Ried im Innkreis</p>
              <p>Österreich</p>
              <p>&nbsp;</p>
              <p><b>Kontaktdaten</b></p>
              <p>Telefon: +43 (0) 676 6510977</p>
              <p>Weitere Kontakt Möglichkeiten <a href="./contact" title="Opens internal link in current window" target="_blank">Kontakt</a>.</p>
            </>
          }
          // city={<p>Ried im Innkreis</p>}
          // zip_code={<p>4910</p>}
          // address={<p>Wildfellnerstraße 22/1</p>}
          // telephone={<p>+43 (0) 676 6510977</p>}
          // telefax={<p>5</p>}
          // whatsapp_telephone={<p>6</p>}
          // whatsapp_contactline={<p>7</p>}
          // email={<p>Email: info@agt-guntrade.at</p>}
          // copyrightholder={<p>9</p>}
        />
        <ImprintLegalLayout
          heading={<p>Rechtliches</p>}
          legal={
            <>
              <p>UID: ATU77453827</p>
              <p>Landesgericht Ried im Innkreis FN: 563839a</p>
              <p>Inh. Patrick Türk</p>
            </>
          }
          // vat_number={<p>1</p>}
          // tax_id={<p>UID:ATU77453827</p>}
          // court_of_registry={<p>Landesgericht Ried im Innkreis FN: 563839a</p>}
          // place_of_registry={<p>Ried im Innkreis</p>}
          // trade_register_number={<p>5</p>}
          // ownership={<p>Inh. Patrick Türk</p>}
        />
        <ImprintTermsLayout
          heading={<p>Bedingungen</p>}
          terms={
            <>
              <h2><b>Grundlegende Richtung der Website (Blattlinie)</b></h2>
              <p>Information über AGT Gun Trade KG, allgemeine Unternehmensinformationen sowie Informationen zu Produkten und Dienstleistungen des Unternehmens und Förderung des Absatzes derselben.</p>
              <p>&nbsp;</p>
              <h2><b>Haftungsausschluss für Inhalte dieser Webseite</b></h2>
              <p>Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen uns, korrekte und aktuelle Informationen bereitzustellen. Es kann trotzdem nicht ausgeschlossen werden, dass Informationen unvollständig, nicht aktualisiert oder fehlerhaft sind. Leider können wir keine Haftung für die Korrektheit aller Inhalte auf dieser Webseite und für daraus resultierende Schäden übernehmen, speziell nicht für jene Inhalte die seitens Dritter bereitgestellt werden. Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitten wir Sie uns umgehend zu kontaktieren, Sie finden die Kontaktdaten obenstehend.</p>
              <p>&nbsp;</p>
              <h2><b>Haftungsausschluss für Links auf dieser Webseite</b></h2>
              <p>Unsere Webseite enthält Hyperlinks (Links) zu anderen Webseiten, für deren Inhalt wir nicht verantwortlich sind und für die wir auch keine Haftung übernehmen können. Sollten Ihnen problematische oder rechtswidrige Links auf unserer Webseite auffallen, bitten wir Sie uns zu kontaktieren. Sie finden die Kontaktdaten obenstehend.</p>
              <p>&nbsp;</p>
              <h2><b>Urheberrechtshinweis</b></h2>
              <p>Alle Inhalte (Bilder, Fotos, Texte, Videos etc.) auf dieser und den übrigen Seiten der AGT-Unternehmenshomepage sowie die Gestaltung der Seiten sind urheberrechtlich geschützt. Alle Rechte, insbesondere das Recht der Vervielfältigung, der Verbreitung und der Zur-Verfügung-Stellung sowie der Übersetzung sind der AGT Gun Trade KG vorbehalten. Kein Teil dieser Seiten darf in irgendeiner Form in welchem Verfahren auch immer ohne schriftliche Genehmigung der AGT Gun Trade KG reproduziert oder unter Verwendung elektronischer Systeme gespeichert, bearbeitet, vervielfältigt, verbreitet oder zur Verfügung gestellt werden. Der Download von Inhalten zum persönlichen, privaten und nicht-kommerziellen Gebrauch ist jedoch gestattet. Einzelne Seiten oder Inhalte können davon abweichend ausdrücklich weitergehende Nutzungsrechte einräumen. Falls notwendig, werden wir die unerlaubte Nutzung von Teilen der Inhalte unserer Seite rechtlich verfolgen.</p>
              <p>&nbsp;</p>
              <h2><b>Bildernachweis</b></h2>
              <p>Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt. Die Bilderrechte liegen beim Medieninhaber der Webseite.</p>
              <p>&nbsp;</p>
              <h2><b>Datenschutz</b></h2>
              <p>Informationen zum Datenschutz finden Sie in unserer <a href="./privacy" title="Opens internal link in current window" target="_blank">Datenschutzerklärung</a>.</p>
              <p>&nbsp;</p>
              <h2><b>Allgemeine Geschäftsbedingungen</b></h2>
              <p>Informationen zum Datenschutz finden Sie in unserere <a href="./agb" title="Opens internal link in current window" target="_blank">AGB</a>.</p>
            </>
          }
          // about={<p>1</p>}
          // privacy={<p>2</p>}
          // shipping={<p>3</p>}
          // gtc={<p>4</p>}
          // cancellation_policy={<p>5</p>}
        />
        {/* <MapLayout
          heading={<p>Karte</p>}
          about={<p>1</p>}
          privacy={<p>2</p>}
          shipping={<p>3</p>}
          gtc={<p>4</p>}
          cancellation_policy={<p>5</p>}
        /> */}
        {/* 46.53825575917372, 14.292146962563237 */}
        <GoogleMaps mt={5} />
      </Container>
    </BaseLayout>
  )
}
