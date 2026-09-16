/**
 * Invitation Actions & Calendar Sharing
 * Google Calendar URL, .ics Download, Web Share API, and Toast Feedback
 */

import { EVENT_CONFIG } from '../core/config.js';

export const Actions = {
  eventData: EVENT_CONFIG,

  init() {
    const calBtns = document.querySelectorAll('.btn-calendar');
    const calPopover = document.getElementById('calendar-popover');
    const closeCal = document.getElementById('close-calendar');
    const optGCal = document.getElementById('opt-gcal');
    const optICS  = document.getElementById('opt-ics');

    if (optGCal) {
      const gcalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(this.eventData.title) +
        '&dates=' + this.eventData.startISO + '/' + this.eventData.endISO +
        '&details=' + encodeURIComponent(this.eventData.description) +
        '&location=' + encodeURIComponent(this.eventData.location);
      optGCal.href = gcalUrl;
    }

    if (optICS) {
      optICS.addEventListener('click', () => {
        this.downloadICS();
        this.closePopover();
      });
    }

    calBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (calPopover) calPopover.classList.add('active');
      });
    });

    if (closeCal && calPopover) {
      closeCal.addEventListener('click', () => this.closePopover());
      calPopover.addEventListener('click', (e) => {
        if (e.target === calPopover) this.closePopover();
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closePopover();
      });
    }

    const shareBtns = document.querySelectorAll('.btn-share');
    shareBtns.forEach(btn => {
      btn.addEventListener('click', () => this.handleShare());
    });
  },

  closePopover() {
    const calPopover = document.getElementById('calendar-popover');
    if (calPopover) calPopover.classList.remove('active');
  },

  downloadICS() {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Dubey Family//Ganesh Chaturthi 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:ganesh-chaturthi-2026-dubey@celebration',
      'DTSTAMP:' + this.eventData.startISO,
      'DTSTART:' + this.eventData.startISO,
      'DTEND:' + this.eventData.endISO,
      'SUMMARY:' + this.eventData.title,
      'DESCRIPTION:' + this.eventData.description.replace(/\n/g, '\\n'),
      'LOCATION:' + this.eventData.location,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ganesh-Chaturthi-2026-Dubey-Family.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('✦ Calendar invitation downloaded!');
  },

  handleShare() {
    const shareData = {
      title: 'Ganesh Chaturthi 2026 — Dubey Family Invitation',
      text: '॥ श्री गणेशाय नमः ॥ Bappa is coming home! Join the Dubey Family in celebrating Ganesh Chaturthi 2026.',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          this.showToast('✦ Invitation link copied to clipboard!');
        }).catch(() => {
          this.fallbackCopy(window.location.href);
        });
      } else {
        this.fallbackCopy(window.location.href);
      }
    }
  },

  fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      this.showToast('✦ Invitation link copied to clipboard!');
    } catch (err) {}
    document.body.removeChild(ta);
  },

  showToast(message) {
    const toast = document.getElementById('festive-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
};

export function initInvitationActions() {
  Actions.init();
}
