"use client";

import {
  Bloom,
  EffectComposer,
  N8AO,
  SMAA,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/** Ambient occlusion, a touch of bloom, tone mapping and a soft vignette. */
export function Effects({ night }: { night: boolean }) {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <N8AO
        aoRadius={0.45}
        distanceFalloff={0.8}
        intensity={2.6}
        quality="medium"
        halfRes
      />
      <Bloom
        mipmapBlur
        luminanceThreshold={night ? 0.7 : 0.9}
        luminanceSmoothing={0.15}
        intensity={night ? 0.8 : 0.45}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette offset={0.25} darkness={night ? 0.68 : 0.5} />
      <SMAA />
    </EffectComposer>
  );
}
