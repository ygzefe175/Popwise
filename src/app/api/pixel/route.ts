import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    // Get the base URL from the request URL itself
    const requestUrl = new URL(request.url);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${requestUrl.protocol}//${requestUrl.host}`;


    const pixelScript = `
(function() {
    'use strict';
    
    var POOPUP = {
        userId: '${userId}',
        apiBase: '${baseUrl}',
        popups: [],
        shown: {},
        
        init: function() {
            var self = this;
            if (!this.userId || this.userId === 'null') {
                console.warn('[PoopUp] No user ID provided');
                return;
            }
            
            // Fetch popups from API
            this.fetchPopups().then(function() {
                self.setupTriggers();
            });
        },
        
        fetchPopups: function() {
            var self = this;
            return fetch(this.apiBase + '/api/popups/' + this.userId)
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    self.popups = data.popups || [];
                    console.log('[PoopUp] Loaded ' + self.popups.length + ' popup(s)');
                })
                .catch(function(err) {
                    console.error('[PoopUp] Failed to load popups:', err);
                });
        },
        
        setupTriggers: function() {
            var self = this;
            
            this.popups.forEach(function(popup) {
                switch(popup.type) {
                    case 'exit_intent':
                        self.setupExitIntent(popup);
                        break;
                    case 'scroll':
                        self.setupScrollTrigger(popup);
                        break;
                    case 'time_based':
                        self.setupTimeTrigger(popup);
                        break;
                    default:
                        // Show after 3 seconds by default
                        setTimeout(function() { self.showPopup(popup); }, 3000);
                }
            });
        },
        
        setupExitIntent: function(popup) {
            var self = this;
            document.addEventListener('mouseout', function(e) {
                if (e.clientY < 10 && !self.shown[popup.id]) {
                    self.showPopup(popup);
                }
            });
        },
        
        setupScrollTrigger: function(popup) {
            var self = this;
            var triggered = false;
            window.addEventListener('scroll', function() {
                if (triggered || self.shown[popup.id]) return;
                var scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                if (scrollPercent > 50) {
                    triggered = true;
                    self.showPopup(popup);
                }
            });
        },
        
        setupTimeTrigger: function(popup) {
            var self = this;
            setTimeout(function() {
                if (!self.shown[popup.id]) {
                    self.showPopup(popup);
                }
            }, 5000);
        },
        
        showPopup: function(popup) {
            if (this.shown[popup.id]) return;
            this.shown[popup.id] = true;
            
            var self = this;
            
            // Track impression
            this.track(popup.id, 'impression');
            
            // Create overlay
            var overlay = document.createElement('div');
            overlay.id = 'poopup-overlay-' + popup.id;
            overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:999998;opacity:0;transition:opacity 0.3s ease;backdrop-filter:blur(4px);';
            
            // Create popup container
            var container = document.createElement('div');
            container.id = 'poopup-' + popup.id;
            container.style.cssText = this.getPositionStyles(popup.position) + 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;transform:scale(0.9);opacity:0;transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);';
            
            container.innerHTML = 
                '<div style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);border-radius:20px;padding:32px;max-width:400px;width:90vw;box-shadow:0 25px 50px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);position:relative;">' +
                    '<button id="poopup-close-' + popup.id + '" style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.1);border:none;color:#999;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;">&times;</button>' +
                    '<h2 style="color:#fff;font-size:24px;font-weight:700;margin:0 0 12px 0;line-height:1.3;">' + this.escapeHtml(popup.headline) + '</h2>' +
                    '<p style="color:#a0a0a0;font-size:15px;margin:0 0 24px 0;line-height:1.6;">' + this.escapeHtml(popup.subtext) + '</p>' +
                    '<button id="poopup-cta-' + popup.id + '" style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#000;font-weight:700;font-size:16px;padding:14px 28px;border:none;border-radius:12px;cursor:pointer;width:100%;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 15px rgba(245,158,11,0.3);">' + this.escapeHtml(popup.cta_text) + '</button>' +
                '</div>';
            
            document.body.appendChild(overlay);
            document.body.appendChild(container);
            
            // Animate in
            setTimeout(function() {
                overlay.style.opacity = '1';
                container.style.transform = 'scale(1)';
                container.style.opacity = '1';
            }, 10);
            
            // Close handlers
            var closePopup = function() {
                overlay.style.opacity = '0';
                container.style.transform = 'scale(0.9)';
                container.style.opacity = '0';
                setTimeout(function() {
                    overlay.remove();
                    container.remove();
                }, 300);
            };
            
            document.getElementById('poopup-close-' + popup.id).onclick = closePopup;
            overlay.onclick = closePopup;
            
            // CTA click
            document.getElementById('poopup-cta-' + popup.id).onclick = function() {
                self.track(popup.id, 'click');
                closePopup();
            };
            
            // Hover effects
            var ctaBtn = document.getElementById('poopup-cta-' + popup.id);
            ctaBtn.onmouseenter = function() { this.style.transform = 'scale(1.02)'; this.style.boxShadow = '0 6px 20px rgba(245,158,11,0.4)'; };
            ctaBtn.onmouseleave = function() { this.style.transform = 'scale(1)'; this.style.boxShadow = '0 4px 15px rgba(245,158,11,0.3)'; };
            
            var closeBtn = document.getElementById('poopup-close-' + popup.id);
            closeBtn.onmouseenter = function() { this.style.background = 'rgba(255,255,255,0.2)'; this.style.color = '#fff'; };
            closeBtn.onmouseleave = function() { this.style.background = 'rgba(255,255,255,0.1)'; this.style.color = '#999'; };
        },
        
        getPositionStyles: function(position) {
            var base = 'position:fixed;z-index:999999;';
            switch(position) {
                case 'top_left': return base + 'top:20px;left:20px;';
                case 'top_right': return base + 'top:20px;right:20px;';
                case 'top_center': return base + 'top:20px;left:50%;transform:translateX(-50%);';
                case 'bottom_left': return base + 'bottom:20px;left:20px;';
                case 'bottom_right': return base + 'bottom:20px;right:20px;';
                case 'bottom_center': return base + 'bottom:20px;left:50%;transform:translateX(-50%);';
                case 'center':
                default: return base + 'top:50%;left:50%;transform:translate(-50%,-50%);';
            }
        },
        
        track: function(popupId, eventType) {
            var data = {
                popup_id: popupId,
                event_type: eventType,
                url: window.location.href,
                user_agent: navigator.userAgent
            };
            
            // Use sendBeacon for reliability
            if (navigator.sendBeacon) {
                navigator.sendBeacon(this.apiBase + '/api/track', JSON.stringify(data));
            } else {
                fetch(this.apiBase + '/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    keepalive: true
                });
            }
        },
        
        escapeHtml: function(text) {
            var div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    };
    
    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { POOPUP.init(); });
    } else {
        POOPUP.init();
    }
    
    // Expose globally for debugging
    window.POOPUP = POOPUP;
})();
`;

    return new NextResponse(pixelScript, {
        headers: {
            'Content-Type': 'application/javascript',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
    });
}
