/* Hover classes bound themselves to a node
 */
class YoutubeHover {
    constructor(node, CURRENT_TAB) {
        this.boundNode = node;
        this.redirectLink = node.href;
        this.linkType = this.checkLinkType();
        this.CURRENT_TAB = CURRENT_TAB;
    }

    /* Description: This function is unique to every Hover class,
     * its goal is to determine which type of embed should be chosen for the link.
     * it can also delete the whole class if there is no point in having an embed.
     */
    checkLinkType() {
        if (this.CURRENT_TAB != 'youtube.com' && (this.redirectLink.includes('/watch?v=') || this.redirectLink.includes('youtu.be'))) {
            if (this.redirectLink.includes('youtu.be')) {
                this.redirectLink = `https://youtube.com/watch?v=${this.redirectLink.split('youtu.be/')[1].replace('?','&')}`
            }

            return 'video';
        } else if(this.redirectLink.includes('channel')) {
            return 'channel';
        } else {
            return 'unknown';
        }
    }

    getIframeSrc() {
        if (this.linkType === 'channel') {
            const channelId = this.redirectLink.split('/')
                                    .filter(part=> part.includes('UC'))
                                    .pop();

            // Need to replace UC in channelId with UU to get the proper embedded link
            return `https://www.youtube-nocookie.com/embed?list=${channelId.replace('UC', 'UU')}`;
        }
        if (this.linkType === 'video') {
            return `https://www.youtube-nocookie.com/embed/${this.redirectLink.split('watch?v=')[1].split('&')[0]}?rel=0`;
        }
    }

    bindToNode() {

        /* TODO: 
         * - Add support for timecodes etc
         * - Set a some sort of div you can always click to stop playing the video / stop playing video when not hovering      
         */

        if (this.linkType == 'video' || this.linkType === 'channel') {
            let container = document.createElement('div');
            container.className = 'tooltiptext tooltiptext-youtube';

            let iframe = document.createElement('iframe');
            iframe.setAttribute('width', '560');
            iframe.setAttribute('height', '315');
            iframe.setAttribute('src', this.getIframeSrc());
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', true);
            //youtube.innerHTML = `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${this.redirectLink.split('watch?v=')[1].split('&')[0]}?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

            container.appendChild(iframe);

            this.boundNode.classList.add('tooltip');
            this.boundNode.appendChild(container);
        }
    }
}