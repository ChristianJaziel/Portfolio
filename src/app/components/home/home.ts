import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
gsap.registerPlugin(SplitText);
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit, AfterViewInit {
  @ViewChild('fadeInDemo', { static: true }) fadeInDemo!: ElementRef;

  private animations:{ [key: string]: gsap.core.Tween | gsap.core.Timeline } = {};

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.runAnimations();
    ScrollTrigger.refresh();
  }

  private runAnimations(){
    this.setFadeInAnimation();
    this.textTransform();
  }

 async textTransform() {
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) return;

  const { SplitText } = await import('gsap/SplitText');
  gsap.registerPlugin(SplitText);

  const st = SplitText.create("p", { type: "chars", charsClass: "char" });

  st.chars.forEach((char: any) => {
    gsap.set(char, { attr: { "data-content": char.innerHTML } });
  });

  const textBlock: any = document.querySelector(".text-block");
  if (textBlock) {
    textBlock.onpointermove = (e: any) => {
      st.chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100)
          gsap.to(char, {
            overwrite: true,
            duration: 1.2 - dist / 100,
            scrambleText: {
              text: String(char.getAttribute('data-content')) ,
              chars: ".:",
              speed: 0.3,
            },
            ease: 'none'
          });
      });
    };
  }
}


  private setFadeInAnimation(){
    const elements = this.fadeInDemo.nativeElement.querySelectorAll('.fade-element');
    // console.log(elements);
    elements.forEach((element:Element, index:number)=>{
      if(index%2 === 0){
        gsap.from(element,{
          opacity:0,
          y:50,
          duration:1,
          delay:index * 0.1,
          scrollTrigger:{
            trigger:element,
            start:"top 80%",
            end:"bottom 20%",
            toggleActions:"play none none reverse"
          }
        })
      }else{
        gsap.from(element,{
          opacity:0,
          y:-50,
          duration:2,
          delay:index * 0.5,
          scrollTrigger:{
            trigger:element,
            start:"top 80%",
            end:"bottom 20%",
            toggleActions:"play none none reverse"
          }
        })
      }
    });
  ScrollTrigger.refresh();  }
}
