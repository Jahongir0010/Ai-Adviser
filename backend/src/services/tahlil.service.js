const geoService = require('./geo.service');

function ratio(part, whole) {
  if (!whole) return null;
  return Math.round((part / whole) * 1000) / 1000;
}

// Real, directly-computed statistics for a mahalla - no AI judgement here,
// just arithmetic on backend/data. This is the "ground truth" both the
// dashboard and the AI idea-generation prompt are built on.
function mahallaTahlili(mahallaId) {
  const mahalla = geoService.getMahallaById(mahallaId);
  if (!mahalla) return null;

  const district = geoService.getDistrictById(mahalla.districtId);
  const region = district ? geoService.getRegionById(district.regionId) : null;
  const districtCredit = geoService.getCreditSummaries({ districtId: mahalla.districtId })[0] || null;

  return {
    mahalla: { id: mahalla.id, name: mahalla.name },
    tuman: district ? { id: district.id, name: district.name } : null,
    hudud: region ? { id: region.id, name: region.name } : null,

    aholiSoni: mahalla.population,
    holati: mahalla.status,
    kambagallikToifasi: mahalla.category,

    tadbirkorlikZichligi: ratio(mahalla.activeBusinessCount, mahalla.population),
    ishsizlikDarajasi: ratio(mahalla.unemployedCount, mahalla.population),
    kambagalOilalarDarajasi: ratio(mahalla.poorFamiliesCount, mahalla.population),

    asosiyIxtisoslashuvlar: mahalla.specializations,
    sektorKreditlari: mahalla.sectorCredits,

    jamiAjratilganKredit: mahalla.totalCreditAllocated,
    nplNisbati: ratio(mahalla.nplAmount, mahalla.totalCreditAllocated),

    infratuzilma: {
      maktablarSoni: mahalla.schoolsCount,
      bogchalarSoni: mahalla.kindergartensCount,
      sportMaydonlariSoni: mahalla.sportsGroundsCount,
      tibbiyotNuqtasiMasofasiKm: mahalla.medicalDistanceKm,
      asfaltYollarKm: mahalla.asphaltRoadsKm,
      ichkiYollarKm: mahalla.internalRoadsKm,
      suvsizXonadonlar: mahalla.householdsWithoutWaterCount,
    },

    tumanKreditDasturlari: districtCredit && {
      mikroKichikOrtaBiznes: districtCredit.microSmallMediumBusiness,
      dasturlarDoirasida: districtCredit.programCredits,
      biznesgaBirinchiQadam: districtCredit.businessFirstStep,
      oilaviyTadbirkorlik: districtCredit.familyEntrepreneurship,
      kichikBiznesQollabQuvvatlash: districtCredit.smallBusinessSupport,
      mahallaLoyihasi: districtCredit.mahallaProject,
    },
  };
}

module.exports = { mahallaTahlili };
