import moment from 'moment';
import { date } from 'quasar';

const soustraireDatetime = (deb: Date, fin: Date) => {
  const unit = 'seconds';
  let seconds = 0;
  //if (date.isValid(new Date(deb)) && date.isValid(fin)) {
  seconds = date.getDateDiff(new Date(deb), new Date(fin), unit);
  //}
  return seconds;
};

const secToTime = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  let dayTransform = hours + ':' + minutes + ':' + seconds;
  if (days === 0) {
    dayTransform = days + 'j' + '' + hours + ':' + minutes + ':' + seconds;
  }
  return dayTransform;
};

const calcul_immo_panne_active = (tab: [], datedeb: Date, datefin: Date) => {
  let immo = 0;
  let deb = datedeb;
  tab.forEach((tb) => {
    if (moment(new Date(tb.DateImmo)).isAfter(moment(new Date(datedeb)))) {
      deb = tb.DateImmo;
    }
    immo = immo + soustraireDatetime(new Date(datefin), new Date(deb));
    console.log(soustraireDatetime(new Date(datefin), new Date(deb)));
  });
  return secToTime(immo);
};

export { calcul_immo_panne_active };
