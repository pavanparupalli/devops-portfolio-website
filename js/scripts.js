/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Download resume button - attempt direct PDF download, fallback to print dialog
    const downloadBtn = document.getElementById('downloadResumeBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            // 0) Try to fetch a named PDF first (several filename variants)
            const pdfCandidates = [
                'assets/Pavan%20Parupalli%20Resume.pdf',
                'assets/Pavan_Parupalli_Resume.pdf',
                'assets/PavanParupalli_Resume.pdf',
                'assets/Resume.pdf'
            ];
            for (const pdfCandidate of pdfCandidates) {
                try {
                    const r = await fetch(pdfCandidate, { cache: 'no-store' });
                    if (r.ok) {
                        const blob = await r.blob();
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        // Use a friendly filename when saving
                        a.download = 'Pavan Parupalli Resume.pdf';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        URL.revokeObjectURL(url);
                        return;
                    }
                } catch (err) {
                    // ignore and try next candidate
                }
            }

            // 1) Try to fetch a specific Untitled HTML and create a PDF from it
            const htmlUrl = 'assets/Untitled.html';
            try {
                const resp = await fetch(htmlUrl, { cache: 'no-store' });
                if (resp.ok) {
                    const htmlText = await resp.text();
                    // Create a temporary container for the fetched HTML
                    const container = document.createElement('div');
                    container.style.position = 'relative';
                    container.style.width = '100%';
                    container.style.background = '#fff';
                    container.style.padding = '20px';
                    container.style.boxSizing = 'border-box';
                    container.innerHTML = htmlText;
                    container.style.display = 'block';
                    container.id = 'tmp-untitled-export';
                    document.body.appendChild(container);

                    if (window.html2pdf) {
                        try {
                            const opt = {
                                margin:       0.5,
                                filename:     'Resume-from-Untitled.pdf',
                                image:        { type: 'jpeg', quality: 0.98 },
                                html2canvas:  { scale: 2 },
                                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                            };
                            await html2pdf().set(opt).from(container).save();
                            container.remove();
                            return;
                        } catch (err) {
                            console.error('html2pdf export failed:', err);
                            container.remove();
                        }
                    } else {
                        // If html2pdf missing, try print the container
                        window.print();
                        container.remove();
                        return;
                    }
                }
            } catch (e) {
                // ignore and continue to other fallbacks
            }

            // 2) Previous behavior: try to download an existing PDF
            const pdfUrl = 'assets/Resume.pdf';
            try {
                const resp2 = await fetch(pdfUrl, { cache: 'no-store' });
                if (resp2.ok) {
                    const blob = await resp2.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Resume.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                    return;
                }
            } catch (e) {
                // ignore and fallback
            }

            // 3) Final fallback: export current page with html2pdf or open print dialog
            if (window.html2pdf) {
                try {
                    const element = document.querySelector('.container-fluid') || document.body;
                    const opt = {
                        margin:       0.5,
                        filename:     'Resume.pdf',
                        image:        { type: 'jpeg', quality: 0.98 },
                        html2canvas:  { scale: 2 },
                        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };
                    await html2pdf().set(opt).from(element).save();
                    return;
                } catch (err) {
                    // fall through to print dialog
                }
            }
            window.print();
        });
    }

});
