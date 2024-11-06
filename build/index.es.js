var be = Object.defineProperty;
var Ie = (h, e, t) => e in h ? be(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var E = (h, e, t) => Ie(h, typeof e != "symbol" ? e + "" : e, t);
import { World as Ne, Material as ee, Body as te, Vec3 as y, Box as Ce, Plane as Oe, ContactMaterial as Pe } from "cannon-es";
import { TrianglesDrawMode as Fe, TriangleFanDrawMode as Q, TriangleStripDrawMode as fe, Loader as De, LoaderUtils as v, FileLoader as pe, Color as I, LinearSRGBColorSpace as N, SpotLight as Be, PointLight as me, DirectionalLight as He, MeshBasicMaterial as G, SRGBColorSpace as U, MeshPhysicalMaterial as S, Vector2 as ge, Matrix4 as j, Vector3 as F, Quaternion as Ae, InstancedMesh as ke, InstancedBufferAttribute as Ge, Object3D as Te, TextureLoader as ve, ImageBitmapLoader as Ue, BufferAttribute as V, InterleavedBuffer as je, InterleavedBufferAttribute as Ke, LinearFilter as xe, LinearMipmapLinearFilter as Re, RepeatWrapping as Z, PointsMaterial as Ve, Material as z, LineBasicMaterial as ze, MeshStandardMaterial as we, DoubleSide as Xe, PropertyBinding as We, BufferGeometry as qe, SkinnedMesh as Ye, Mesh as Ee, LineSegments as Qe, Line as Ze, LineLoop as Je, Points as $e, Group as X, PerspectiveCamera as ye, MathUtils as et, OrthographicCamera as tt, Skeleton as nt, AnimationClip as st, Bone as it, InterpolateLinear as Me, ColorManagement as ne, NearestFilter as rt, NearestMipmapNearestFilter as ot, LinearMipmapNearestFilter as at, NearestMipmapLinearFilter as ct, ClampToEdgeWrapping as lt, MirroredRepeatWrapping as ut, InterpolateDiscrete as ht, FrontSide as dt, Texture as se, VectorKeyframeTrack as ie, NumberKeyframeTrack as re, QuaternionKeyframeTrack as oe, Box3 as _e, Sphere as ft, Interpolant as pt, Scene as mt, WebGLRenderer as gt, PCFShadowMap as ae, AmbientLight as At, PlaneGeometry as Tt, ShadowMaterial as xt, AxesHelper as Rt } from "three";
import { Interaction as wt } from "three.interaction";
function ce(h, e) {
  if (e === Fe)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), h;
  if (e === Q || e === fe) {
    let t = h.getIndex();
    if (t === null) {
      const i = [], a = h.getAttribute("position");
      if (a !== void 0) {
        for (let o = 0; o < a.count; o++)
          i.push(o);
        h.setIndex(i), t = h.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), h;
    }
    const r = t.count - 2, n = [];
    if (e === Q)
      for (let i = 1; i <= r; i++)
        n.push(t.getX(0)), n.push(t.getX(i)), n.push(t.getX(i + 1));
    else
      for (let i = 0; i < r; i++)
        i % 2 === 0 ? (n.push(t.getX(i)), n.push(t.getX(i + 1)), n.push(t.getX(i + 2))) : (n.push(t.getX(i + 2)), n.push(t.getX(i + 1)), n.push(t.getX(i)));
    n.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const s = h.clone();
    return s.setIndex(n), s.clearGroups(), s;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), h;
}
class Et extends De {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new St(t);
    }), this.register(function(t) {
      return new bt(t);
    }), this.register(function(t) {
      return new Ht(t);
    }), this.register(function(t) {
      return new kt(t);
    }), this.register(function(t) {
      return new Gt(t);
    }), this.register(function(t) {
      return new Nt(t);
    }), this.register(function(t) {
      return new Ct(t);
    }), this.register(function(t) {
      return new Ot(t);
    }), this.register(function(t) {
      return new Pt(t);
    }), this.register(function(t) {
      return new Lt(t);
    }), this.register(function(t) {
      return new Ft(t);
    }), this.register(function(t) {
      return new It(t);
    }), this.register(function(t) {
      return new Bt(t);
    }), this.register(function(t) {
      return new Dt(t);
    }), this.register(function(t) {
      return new Mt(t);
    }), this.register(function(t) {
      return new vt(t);
    }), this.register(function(t) {
      return new Ut(t);
    });
  }
  load(e, t, r, n) {
    const s = this;
    let i;
    if (this.resourcePath !== "")
      i = this.resourcePath;
    else if (this.path !== "") {
      const c = v.extractUrlBase(e);
      i = v.resolveURL(c, this.path);
    } else
      i = v.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(c) {
      n ? n(c) : console.error(c), s.manager.itemError(e), s.manager.itemEnd(e);
    }, o = new pe(this.manager);
    o.setPath(this.path), o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(e, function(c) {
      try {
        s.parse(c, i, function(u) {
          t(u), s.manager.itemEnd(e);
        }, a);
      } catch (u) {
        a(u);
      }
    }, r, a);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, r, n) {
    let s;
    const i = {}, a = {}, o = new TextDecoder();
    if (typeof e == "string")
      s = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (o.decode(new Uint8Array(e, 0, 4)) === Le) {
        try {
          i[A.KHR_BINARY_GLTF] = new jt(e);
        } catch (l) {
          n && n(l);
          return;
        }
        s = JSON.parse(i[A.KHR_BINARY_GLTF].content);
      } else
        s = JSON.parse(o.decode(e));
    else
      s = e;
    if (s.asset === void 0 || s.asset.version[0] < 2) {
      n && n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new tn(s, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let u = 0; u < this.pluginCallbacks.length; u++) {
      const l = this.pluginCallbacks[u](c);
      l.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[l.name] = l, i[l.name] = !0;
    }
    if (s.extensionsUsed)
      for (let u = 0; u < s.extensionsUsed.length; ++u) {
        const l = s.extensionsUsed[u], d = s.extensionsRequired || [];
        switch (l) {
          case A.KHR_MATERIALS_UNLIT:
            i[l] = new _t();
            break;
          case A.KHR_DRACO_MESH_COMPRESSION:
            i[l] = new Kt(s, this.dracoLoader);
            break;
          case A.KHR_TEXTURE_TRANSFORM:
            i[l] = new Vt();
            break;
          case A.KHR_MESH_QUANTIZATION:
            i[l] = new zt();
            break;
          default:
            d.indexOf(l) >= 0 && a[l] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + l + '".');
        }
      }
    c.setExtensions(i), c.setPlugins(a), c.parse(r, n);
  }
  parseAsync(e, t) {
    const r = this;
    return new Promise(function(n, s) {
      r.parse(e, t, n, s);
    });
  }
}
function yt() {
  let h = {};
  return {
    get: function(e) {
      return h[e];
    },
    add: function(e, t) {
      h[e] = t;
    },
    remove: function(e) {
      delete h[e];
    },
    removeAll: function() {
      h = {};
    }
  };
}
const A = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Mt {
  constructor(e) {
    this.parser = e, this.name = A.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let r = 0, n = t.length; r < n; r++) {
      const s = t[r];
      s.extensions && s.extensions[this.name] && s.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, s.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, r = "light:" + e;
    let n = t.cache.get(r);
    if (n) return n;
    const s = t.json, o = ((s.extensions && s.extensions[this.name] || {}).lights || [])[e];
    let c;
    const u = new I(16777215);
    o.color !== void 0 && u.setRGB(o.color[0], o.color[1], o.color[2], N);
    const l = o.range !== void 0 ? o.range : 0;
    switch (o.type) {
      case "directional":
        c = new He(u), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new me(u), c.distance = l;
        break;
      case "spot":
        c = new Be(u), c.distance = l, o.spot = o.spot || {}, o.spot.innerConeAngle = o.spot.innerConeAngle !== void 0 ? o.spot.innerConeAngle : 0, o.spot.outerConeAngle = o.spot.outerConeAngle !== void 0 ? o.spot.outerConeAngle : Math.PI / 4, c.angle = o.spot.outerConeAngle, c.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + o.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, b(c, o), o.intensity !== void 0 && (c.intensity = o.intensity), c.name = t.createUniqueName(o.name || "light_" + e), n = Promise.resolve(c), t.cache.add(r, n), n;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, r = this.parser, s = r.json.nodes[e], a = (s.extensions && s.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(o) {
      return r._getNodeRef(t.cache, a, o);
    });
  }
}
class _t {
  constructor() {
    this.name = A.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return G;
  }
  extendParams(e, t, r) {
    const n = [];
    e.color = new I(1, 1, 1), e.opacity = 1;
    const s = t.pbrMetallicRoughness;
    if (s) {
      if (Array.isArray(s.baseColorFactor)) {
        const i = s.baseColorFactor;
        e.color.setRGB(i[0], i[1], i[2], N), e.opacity = i[3];
      }
      s.baseColorTexture !== void 0 && n.push(r.assignTexture(e, "map", s.baseColorTexture, U));
    }
    return Promise.all(n);
  }
}
class Lt {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = n.extensions[this.name].emissiveStrength;
    return s !== void 0 && (t.emissiveIntensity = s), Promise.resolve();
  }
}
class St {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const r = this.parser, n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    if (i.clearcoatFactor !== void 0 && (t.clearcoat = i.clearcoatFactor), i.clearcoatTexture !== void 0 && s.push(r.assignTexture(t, "clearcoatMap", i.clearcoatTexture)), i.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = i.clearcoatRoughnessFactor), i.clearcoatRoughnessTexture !== void 0 && s.push(r.assignTexture(t, "clearcoatRoughnessMap", i.clearcoatRoughnessTexture)), i.clearcoatNormalTexture !== void 0 && (s.push(r.assignTexture(t, "clearcoatNormalMap", i.clearcoatNormalTexture)), i.clearcoatNormalTexture.scale !== void 0)) {
      const a = i.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new ge(a, a);
    }
    return Promise.all(s);
  }
}
class bt {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = n.extensions[this.name];
    return t.dispersion = s.dispersion !== void 0 ? s.dispersion : 0, Promise.resolve();
  }
}
class It {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const r = this.parser, n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    return i.iridescenceFactor !== void 0 && (t.iridescence = i.iridescenceFactor), i.iridescenceTexture !== void 0 && s.push(r.assignTexture(t, "iridescenceMap", i.iridescenceTexture)), i.iridescenceIor !== void 0 && (t.iridescenceIOR = i.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), i.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = i.iridescenceThicknessMinimum), i.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = i.iridescenceThicknessMaximum), i.iridescenceThicknessTexture !== void 0 && s.push(r.assignTexture(t, "iridescenceThicknessMap", i.iridescenceThicknessTexture)), Promise.all(s);
  }
}
class Nt {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const r = this.parser, n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [];
    t.sheenColor = new I(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const i = n.extensions[this.name];
    if (i.sheenColorFactor !== void 0) {
      const a = i.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], N);
    }
    return i.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = i.sheenRoughnessFactor), i.sheenColorTexture !== void 0 && s.push(r.assignTexture(t, "sheenColorMap", i.sheenColorTexture, U)), i.sheenRoughnessTexture !== void 0 && s.push(r.assignTexture(t, "sheenRoughnessMap", i.sheenRoughnessTexture)), Promise.all(s);
  }
}
class Ct {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const r = this.parser, n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    return i.transmissionFactor !== void 0 && (t.transmission = i.transmissionFactor), i.transmissionTexture !== void 0 && s.push(r.assignTexture(t, "transmissionMap", i.transmissionTexture)), Promise.all(s);
  }
}
class Ot {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const r = this.parser, n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    t.thickness = i.thicknessFactor !== void 0 ? i.thicknessFactor : 0, i.thicknessTexture !== void 0 && s.push(r.assignTexture(t, "thicknessMap", i.thicknessTexture)), t.attenuationDistance = i.attenuationDistance || 1 / 0;
    const a = i.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new I().setRGB(a[0], a[1], a[2], N), Promise.all(s);
  }
}
class Pt {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = n.extensions[this.name];
    return t.ior = s.ior !== void 0 ? s.ior : 1.5, Promise.resolve();
  }
}
class Ft {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const r = this.parser, n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    t.specularIntensity = i.specularFactor !== void 0 ? i.specularFactor : 1, i.specularTexture !== void 0 && s.push(r.assignTexture(t, "specularIntensityMap", i.specularTexture));
    const a = i.specularColorFactor || [1, 1, 1];
    return t.specularColor = new I().setRGB(a[0], a[1], a[2], N), i.specularColorTexture !== void 0 && s.push(r.assignTexture(t, "specularColorMap", i.specularColorTexture, U)), Promise.all(s);
  }
}
class Dt {
  constructor(e) {
    this.parser = e, this.name = A.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const r = this.parser, n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    return t.bumpScale = i.bumpFactor !== void 0 ? i.bumpFactor : 1, i.bumpTexture !== void 0 && s.push(r.assignTexture(t, "bumpMap", i.bumpTexture)), Promise.all(s);
  }
}
class Bt {
  constructor(e) {
    this.parser = e, this.name = A.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const r = this.parser.json.materials[e];
    return !r.extensions || !r.extensions[this.name] ? null : S;
  }
  extendMaterialParams(e, t) {
    const r = this.parser, n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    return i.anisotropyStrength !== void 0 && (t.anisotropy = i.anisotropyStrength), i.anisotropyRotation !== void 0 && (t.anisotropyRotation = i.anisotropyRotation), i.anisotropyTexture !== void 0 && s.push(r.assignTexture(t, "anisotropyMap", i.anisotropyTexture)), Promise.all(s);
  }
}
class Ht {
  constructor(e) {
    this.parser = e, this.name = A.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, r = t.json, n = r.textures[e];
    if (!n.extensions || !n.extensions[this.name])
      return null;
    const s = n.extensions[this.name], i = t.options.ktx2Loader;
    if (!i) {
      if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, s.source, i);
  }
}
class kt {
  constructor(e) {
    this.parser = e, this.name = A.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, r = this.parser, n = r.json, s = n.textures[e];
    if (!s.extensions || !s.extensions[t])
      return null;
    const i = s.extensions[t], a = n.images[i.source];
    let o = r.textureLoader;
    if (a.uri) {
      const c = r.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return r.loadTextureImage(e, i.source, o);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return r.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Gt {
  constructor(e) {
    this.parser = e, this.name = A.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, r = this.parser, n = r.json, s = n.textures[e];
    if (!s.extensions || !s.extensions[t])
      return null;
    const i = s.extensions[t], a = n.images[i.source];
    let o = r.textureLoader;
    if (a.uri) {
      const c = r.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return r.loadTextureImage(e, i.source, o);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return r.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class vt {
  constructor(e) {
    this.name = A.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, r = t.bufferViews[e];
    if (r.extensions && r.extensions[this.name]) {
      const n = r.extensions[this.name], s = this.parser.getDependency("buffer", n.buffer), i = this.parser.options.meshoptDecoder;
      if (!i || !i.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return s.then(function(a) {
        const o = n.byteOffset || 0, c = n.byteLength || 0, u = n.count, l = n.byteStride, d = new Uint8Array(a, o, c);
        return i.decodeGltfBufferAsync ? i.decodeGltfBufferAsync(u, l, d, n.mode, n.filter).then(function(f) {
          return f.buffer;
        }) : i.ready.then(function() {
          const f = new ArrayBuffer(u * l);
          return i.decodeGltfBuffer(new Uint8Array(f), u, l, d, n.mode, n.filter), f;
        });
      });
    } else
      return null;
  }
}
class Ut {
  constructor(e) {
    this.name = A.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, r = t.nodes[e];
    if (!r.extensions || !r.extensions[this.name] || r.mesh === void 0)
      return null;
    const n = t.meshes[r.mesh];
    for (const c of n.primitives)
      if (c.mode !== M.TRIANGLES && c.mode !== M.TRIANGLE_STRIP && c.mode !== M.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const i = r.extensions[this.name].attributes, a = [], o = {};
    for (const c in i)
      a.push(this.parser.getDependency("accessor", i[c]).then((u) => (o[c] = u, o[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((c) => {
      const u = c.pop(), l = u.isGroup ? u.children : [u], d = c[0].count, f = [];
      for (const m of l) {
        const T = new j(), p = new F(), g = new Ae(), x = new F(1, 1, 1), w = new ke(m.geometry, m.material, d);
        for (let R = 0; R < d; R++)
          o.TRANSLATION && p.fromBufferAttribute(o.TRANSLATION, R), o.ROTATION && g.fromBufferAttribute(o.ROTATION, R), o.SCALE && x.fromBufferAttribute(o.SCALE, R), w.setMatrixAt(R, T.compose(p, g, x));
        for (const R in o)
          if (R === "_COLOR_0") {
            const L = o[R];
            w.instanceColor = new Ge(L.array, L.itemSize, L.normalized);
          } else R !== "TRANSLATION" && R !== "ROTATION" && R !== "SCALE" && m.geometry.setAttribute(R, o[R]);
        Te.prototype.copy.call(w, m), this.parser.assignFinalMaterial(w), f.push(w);
      }
      return u.isGroup ? (u.clear(), u.add(...f), u) : f[0];
    }));
  }
}
const Le = "glTF", k = 12, le = { JSON: 1313821514, BIN: 5130562 };
class jt {
  constructor(e) {
    this.name = A.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, k), r = new TextDecoder();
    if (this.header = {
      magic: r.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== Le)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - k, s = new DataView(e, k);
    let i = 0;
    for (; i < n; ) {
      const a = s.getUint32(i, !0);
      i += 4;
      const o = s.getUint32(i, !0);
      if (i += 4, o === le.JSON) {
        const c = new Uint8Array(e, k + i, a);
        this.content = r.decode(c);
      } else if (o === le.BIN) {
        const c = k + i;
        this.body = e.slice(c, c + a);
      }
      i += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Kt {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = A.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const r = this.json, n = this.dracoLoader, s = e.extensions[this.name].bufferView, i = e.extensions[this.name].attributes, a = {}, o = {}, c = {};
    for (const u in i) {
      const l = J[u] || u.toLowerCase();
      a[l] = i[u];
    }
    for (const u in e.attributes) {
      const l = J[u] || u.toLowerCase();
      if (i[u] !== void 0) {
        const d = r.accessors[e.attributes[u]], f = B[d.componentType];
        c[l] = f.name, o[l] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", s).then(function(u) {
      return new Promise(function(l, d) {
        n.decodeDracoFile(u, function(f) {
          for (const m in f.attributes) {
            const T = f.attributes[m], p = o[m];
            p !== void 0 && (T.normalized = p);
          }
          l(f);
        }, a, c, N, d);
      });
    });
  }
}
class Vt {
  constructor() {
    this.name = A.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class zt {
  constructor() {
    this.name = A.KHR_MESH_QUANTIZATION;
  }
}
class Se extends pt {
  constructor(e, t, r, n) {
    super(e, t, r, n);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, r = this.sampleValues, n = this.valueSize, s = e * n * 3 + n;
    for (let i = 0; i !== n; i++)
      t[i] = r[s + i];
    return t;
  }
  interpolate_(e, t, r, n) {
    const s = this.resultBuffer, i = this.sampleValues, a = this.valueSize, o = a * 2, c = a * 3, u = n - t, l = (r - t) / u, d = l * l, f = d * l, m = e * c, T = m - c, p = -2 * f + 3 * d, g = f - d, x = 1 - p, w = g - d + l;
    for (let R = 0; R !== a; R++) {
      const L = i[T + R + a], C = i[T + R + o] * u, _ = i[m + R + a], H = i[m + R] * u;
      s[R] = x * L + w * C + p * _ + g * H;
    }
    return s;
  }
}
const Xt = new Ae();
class Wt extends Se {
  interpolate_(e, t, r, n) {
    const s = super.interpolate_(e, t, r, n);
    return Xt.fromArray(s).normalize().toArray(s), s;
  }
}
const M = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, B = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, ue = {
  9728: rt,
  9729: xe,
  9984: ot,
  9985: at,
  9986: ct,
  9987: Re
}, he = {
  33071: lt,
  33648: ut,
  10497: Z
}, W = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, J = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, P = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, qt = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Me,
  STEP: ht
}, q = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Yt(h) {
  return h.DefaultMaterial === void 0 && (h.DefaultMaterial = new we({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: dt
  })), h.DefaultMaterial;
}
function D(h, e, t) {
  for (const r in t.extensions)
    h[r] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[r] = t.extensions[r]);
}
function b(h, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(h.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Qt(h, e, t) {
  let r = !1, n = !1, s = !1;
  for (let c = 0, u = e.length; c < u; c++) {
    const l = e[c];
    if (l.POSITION !== void 0 && (r = !0), l.NORMAL !== void 0 && (n = !0), l.COLOR_0 !== void 0 && (s = !0), r && n && s) break;
  }
  if (!r && !n && !s) return Promise.resolve(h);
  const i = [], a = [], o = [];
  for (let c = 0, u = e.length; c < u; c++) {
    const l = e[c];
    if (r) {
      const d = l.POSITION !== void 0 ? t.getDependency("accessor", l.POSITION) : h.attributes.position;
      i.push(d);
    }
    if (n) {
      const d = l.NORMAL !== void 0 ? t.getDependency("accessor", l.NORMAL) : h.attributes.normal;
      a.push(d);
    }
    if (s) {
      const d = l.COLOR_0 !== void 0 ? t.getDependency("accessor", l.COLOR_0) : h.attributes.color;
      o.push(d);
    }
  }
  return Promise.all([
    Promise.all(i),
    Promise.all(a),
    Promise.all(o)
  ]).then(function(c) {
    const u = c[0], l = c[1], d = c[2];
    return r && (h.morphAttributes.position = u), n && (h.morphAttributes.normal = l), s && (h.morphAttributes.color = d), h.morphTargetsRelative = !0, h;
  });
}
function Zt(h, e) {
  if (h.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, r = e.weights.length; t < r; t++)
      h.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (h.morphTargetInfluences.length === t.length) {
      h.morphTargetDictionary = {};
      for (let r = 0, n = t.length; r < n; r++)
        h.morphTargetDictionary[t[r]] = r;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Jt(h) {
  let e;
  const t = h.extensions && h.extensions[A.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Y(t.attributes) : e = h.indices + ":" + Y(h.attributes) + ":" + h.mode, h.targets !== void 0)
    for (let r = 0, n = h.targets.length; r < n; r++)
      e += ":" + Y(h.targets[r]);
  return e;
}
function Y(h) {
  let e = "";
  const t = Object.keys(h).sort();
  for (let r = 0, n = t.length; r < n; r++)
    e += t[r] + ":" + h[t[r]] + ";";
  return e;
}
function $(h) {
  switch (h) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function $t(h) {
  return h.search(/\.jpe?g($|\?)/i) > 0 || h.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : h.search(/\.webp($|\?)/i) > 0 || h.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const en = new j();
class tn {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new yt(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let r = !1, n = -1, s = !1, i = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      r = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const o = a.match(/Version\/(\d+)/);
      n = r && o ? parseInt(o[1], 10) : -1, s = a.indexOf("Firefox") > -1, i = s ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || r && n < 17 || s && i < 98 ? this.textureLoader = new ve(this.options.manager) : this.textureLoader = new Ue(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new pe(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const r = this, n = this.json, s = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(i) {
      return i._markDefs && i._markDefs();
    }), Promise.all(this._invokeAll(function(i) {
      return i.beforeRoot && i.beforeRoot();
    })).then(function() {
      return Promise.all([
        r.getDependencies("scene"),
        r.getDependencies("animation"),
        r.getDependencies("camera")
      ]);
    }).then(function(i) {
      const a = {
        scene: i[0][n.scene || 0],
        scenes: i[0],
        animations: i[1],
        cameras: i[2],
        asset: n.asset,
        parser: r,
        userData: {}
      };
      return D(s, a, n), b(a, n), Promise.all(r._invokeAll(function(o) {
        return o.afterRoot && o.afterRoot(a);
      })).then(function() {
        for (const o of a.scenes)
          o.updateMatrixWorld();
        e(a);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], r = this.json.meshes || [];
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n].joints;
      for (let a = 0, o = i.length; a < o; a++)
        e[i[a]].isBone = !0;
    }
    for (let n = 0, s = e.length; n < s; n++) {
      const i = e[n];
      i.mesh !== void 0 && (this._addNodeRef(this.meshCache, i.mesh), i.skin !== void 0 && (r[i.mesh].isSkinnedMesh = !0)), i.camera !== void 0 && this._addNodeRef(this.cameraCache, i.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(e, t, r) {
    if (e.refs[t] <= 1) return r;
    const n = r.clone(), s = (i, a) => {
      const o = this.associations.get(i);
      o != null && this.associations.set(a, o);
      for (const [c, u] of i.children.entries())
        s(u, a.children[c]);
    };
    return s(r, n), n.name += "_instance_" + e.uses[t]++, n;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let r = 0; r < t.length; r++) {
      const n = e(t[r]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const r = [];
    for (let n = 0; n < t.length; n++) {
      const s = e(t[n]);
      s && r.push(s);
    }
    return r;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(e, t) {
    const r = e + ":" + t;
    let n = this.cache.get(r);
    if (!n) {
      switch (e) {
        case "scene":
          n = this.loadScene(t);
          break;
        case "node":
          n = this._invokeOne(function(s) {
            return s.loadNode && s.loadNode(t);
          });
          break;
        case "mesh":
          n = this._invokeOne(function(s) {
            return s.loadMesh && s.loadMesh(t);
          });
          break;
        case "accessor":
          n = this.loadAccessor(t);
          break;
        case "bufferView":
          n = this._invokeOne(function(s) {
            return s.loadBufferView && s.loadBufferView(t);
          });
          break;
        case "buffer":
          n = this.loadBuffer(t);
          break;
        case "material":
          n = this._invokeOne(function(s) {
            return s.loadMaterial && s.loadMaterial(t);
          });
          break;
        case "texture":
          n = this._invokeOne(function(s) {
            return s.loadTexture && s.loadTexture(t);
          });
          break;
        case "skin":
          n = this.loadSkin(t);
          break;
        case "animation":
          n = this._invokeOne(function(s) {
            return s.loadAnimation && s.loadAnimation(t);
          });
          break;
        case "camera":
          n = this.loadCamera(t);
          break;
        default:
          if (n = this._invokeOne(function(s) {
            return s != this && s.getDependency && s.getDependency(e, t);
          }), !n)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(r, n);
    }
    return n;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const r = this, n = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(n.map(function(s, i) {
        return r.getDependency(e, i);
      })), this.cache.add(e, t);
    }
    return t;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const t = this.json.buffers[e], r = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[A.KHR_BINARY_GLTF].body);
    const n = this.options;
    return new Promise(function(s, i) {
      r.load(v.resolveURL(t.uri, n.path), s, void 0, function() {
        i(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(r) {
      const n = t.byteLength || 0, s = t.byteOffset || 0;
      return r.slice(s, s + n);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, r = this.json, n = this.json.accessors[e];
    if (n.bufferView === void 0 && n.sparse === void 0) {
      const i = W[n.type], a = B[n.componentType], o = n.normalized === !0, c = new a(n.count * i);
      return Promise.resolve(new V(c, i, o));
    }
    const s = [];
    return n.bufferView !== void 0 ? s.push(this.getDependency("bufferView", n.bufferView)) : s.push(null), n.sparse !== void 0 && (s.push(this.getDependency("bufferView", n.sparse.indices.bufferView)), s.push(this.getDependency("bufferView", n.sparse.values.bufferView))), Promise.all(s).then(function(i) {
      const a = i[0], o = W[n.type], c = B[n.componentType], u = c.BYTES_PER_ELEMENT, l = u * o, d = n.byteOffset || 0, f = n.bufferView !== void 0 ? r.bufferViews[n.bufferView].byteStride : void 0, m = n.normalized === !0;
      let T, p;
      if (f && f !== l) {
        const g = Math.floor(d / f), x = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + g + ":" + n.count;
        let w = t.cache.get(x);
        w || (T = new c(a, g * f, n.count * f / u), w = new je(T, f / u), t.cache.add(x, w)), p = new Ke(w, o, d % f / u, m);
      } else
        a === null ? T = new c(n.count * o) : T = new c(a, d, n.count * o), p = new V(T, o, m);
      if (n.sparse !== void 0) {
        const g = W.SCALAR, x = B[n.sparse.indices.componentType], w = n.sparse.indices.byteOffset || 0, R = n.sparse.values.byteOffset || 0, L = new x(i[1], w, n.sparse.count * g), C = new c(i[2], R, n.sparse.count * o);
        a !== null && (p = new V(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1;
        for (let _ = 0, H = L.length; _ < H; _++) {
          const O = L[_];
          if (p.setX(O, C[_ * o]), o >= 2 && p.setY(O, C[_ * o + 1]), o >= 3 && p.setZ(O, C[_ * o + 2]), o >= 4 && p.setW(O, C[_ * o + 3]), o >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        p.normalized = m;
      }
      return p;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(e) {
    const t = this.json, r = this.options, s = t.textures[e].source, i = t.images[s];
    let a = this.textureLoader;
    if (i.uri) {
      const o = r.manager.getHandler(i.uri);
      o !== null && (a = o);
    }
    return this.loadTextureImage(e, s, a);
  }
  loadTextureImage(e, t, r) {
    const n = this, s = this.json, i = s.textures[e], a = s.images[t], o = (a.uri || a.bufferView) + ":" + i.sampler;
    if (this.textureCache[o])
      return this.textureCache[o];
    const c = this.loadImageSource(t, r).then(function(u) {
      u.flipY = !1, u.name = i.name || a.name || "", u.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (u.name = a.uri);
      const d = (s.samplers || {})[i.sampler] || {};
      return u.magFilter = ue[d.magFilter] || xe, u.minFilter = ue[d.minFilter] || Re, u.wrapS = he[d.wrapS] || Z, u.wrapT = he[d.wrapT] || Z, n.associations.set(u, { textures: e }), u;
    }).catch(function() {
      return null;
    });
    return this.textureCache[o] = c, c;
  }
  loadImageSource(e, t) {
    const r = this, n = this.json, s = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((l) => l.clone());
    const i = n.images[e], a = self.URL || self.webkitURL;
    let o = i.uri || "", c = !1;
    if (i.bufferView !== void 0)
      o = r.getDependency("bufferView", i.bufferView).then(function(l) {
        c = !0;
        const d = new Blob([l], { type: i.mimeType });
        return o = a.createObjectURL(d), o;
      });
    else if (i.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const u = Promise.resolve(o).then(function(l) {
      return new Promise(function(d, f) {
        let m = d;
        t.isImageBitmapLoader === !0 && (m = function(T) {
          const p = new se(T);
          p.needsUpdate = !0, d(p);
        }), t.load(v.resolveURL(l, s.path), m, void 0, f);
      });
    }).then(function(l) {
      return c === !0 && a.revokeObjectURL(o), b(l, i), l.userData.mimeType = i.mimeType || $t(i.uri), l;
    }).catch(function(l) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", o), l;
    });
    return this.sourceCache[e] = u, u;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(e, t, r, n) {
    const s = this;
    return this.getDependency("texture", r.index).then(function(i) {
      if (!i) return null;
      if (r.texCoord !== void 0 && r.texCoord > 0 && (i = i.clone(), i.channel = r.texCoord), s.extensions[A.KHR_TEXTURE_TRANSFORM]) {
        const a = r.extensions !== void 0 ? r.extensions[A.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const o = s.associations.get(i);
          i = s.extensions[A.KHR_TEXTURE_TRANSFORM].extendTexture(i, a), s.associations.set(i, o);
        }
      }
      return n !== void 0 && (i.colorSpace = n), e[t] = i, i;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(e) {
    const t = e.geometry;
    let r = e.material;
    const n = t.attributes.tangent === void 0, s = t.attributes.color !== void 0, i = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + r.uuid;
      let o = this.cache.get(a);
      o || (o = new Ve(), z.prototype.copy.call(o, r), o.color.copy(r.color), o.map = r.map, o.sizeAttenuation = !1, this.cache.add(a, o)), r = o;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + r.uuid;
      let o = this.cache.get(a);
      o || (o = new ze(), z.prototype.copy.call(o, r), o.color.copy(r.color), o.map = r.map, this.cache.add(a, o)), r = o;
    }
    if (n || s || i) {
      let a = "ClonedMaterial:" + r.uuid + ":";
      n && (a += "derivative-tangents:"), s && (a += "vertex-colors:"), i && (a += "flat-shading:");
      let o = this.cache.get(a);
      o || (o = r.clone(), s && (o.vertexColors = !0), i && (o.flatShading = !0), n && (o.normalScale && (o.normalScale.y *= -1), o.clearcoatNormalScale && (o.clearcoatNormalScale.y *= -1)), this.cache.add(a, o), this.associations.set(o, this.associations.get(r))), r = o;
    }
    e.material = r;
  }
  getMaterialType() {
    return we;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, r = this.json, n = this.extensions, s = r.materials[e];
    let i;
    const a = {}, o = s.extensions || {}, c = [];
    if (o[A.KHR_MATERIALS_UNLIT]) {
      const l = n[A.KHR_MATERIALS_UNLIT];
      i = l.getMaterialType(), c.push(l.extendParams(a, s, t));
    } else {
      const l = s.pbrMetallicRoughness || {};
      if (a.color = new I(1, 1, 1), a.opacity = 1, Array.isArray(l.baseColorFactor)) {
        const d = l.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], N), a.opacity = d[3];
      }
      l.baseColorTexture !== void 0 && c.push(t.assignTexture(a, "map", l.baseColorTexture, U)), a.metalness = l.metallicFactor !== void 0 ? l.metallicFactor : 1, a.roughness = l.roughnessFactor !== void 0 ? l.roughnessFactor : 1, l.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(a, "metalnessMap", l.metallicRoughnessTexture)), c.push(t.assignTexture(a, "roughnessMap", l.metallicRoughnessTexture))), i = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, a);
      })));
    }
    s.doubleSided === !0 && (a.side = Xe);
    const u = s.alphaMode || q.OPAQUE;
    if (u === q.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, u === q.MASK && (a.alphaTest = s.alphaCutoff !== void 0 ? s.alphaCutoff : 0.5)), s.normalTexture !== void 0 && i !== G && (c.push(t.assignTexture(a, "normalMap", s.normalTexture)), a.normalScale = new ge(1, 1), s.normalTexture.scale !== void 0)) {
      const l = s.normalTexture.scale;
      a.normalScale.set(l, l);
    }
    if (s.occlusionTexture !== void 0 && i !== G && (c.push(t.assignTexture(a, "aoMap", s.occlusionTexture)), s.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = s.occlusionTexture.strength)), s.emissiveFactor !== void 0 && i !== G) {
      const l = s.emissiveFactor;
      a.emissive = new I().setRGB(l[0], l[1], l[2], N);
    }
    return s.emissiveTexture !== void 0 && i !== G && c.push(t.assignTexture(a, "emissiveMap", s.emissiveTexture, U)), Promise.all(c).then(function() {
      const l = new i(a);
      return s.name && (l.name = s.name), b(l, s), t.associations.set(l, { materials: e }), s.extensions && D(n, l, s), l;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = We.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const t = this, r = this.extensions, n = this.primitiveCache;
    function s(a) {
      return r[A.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(o) {
        return de(o, a, t);
      });
    }
    const i = [];
    for (let a = 0, o = e.length; a < o; a++) {
      const c = e[a], u = Jt(c), l = n[u];
      if (l)
        i.push(l.promise);
      else {
        let d;
        c.extensions && c.extensions[A.KHR_DRACO_MESH_COMPRESSION] ? d = s(c) : d = de(new qe(), c, t), n[u] = { primitive: c, promise: d }, i.push(d);
      }
    }
    return Promise.all(i);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const t = this, r = this.json, n = this.extensions, s = r.meshes[e], i = s.primitives, a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const u = i[o].material === void 0 ? Yt(this.cache) : this.getDependency("material", i[o].material);
      a.push(u);
    }
    return a.push(t.loadGeometries(i)), Promise.all(a).then(function(o) {
      const c = o.slice(0, o.length - 1), u = o[o.length - 1], l = [];
      for (let f = 0, m = u.length; f < m; f++) {
        const T = u[f], p = i[f];
        let g;
        const x = c[f];
        if (p.mode === M.TRIANGLES || p.mode === M.TRIANGLE_STRIP || p.mode === M.TRIANGLE_FAN || p.mode === void 0)
          g = s.isSkinnedMesh === !0 ? new Ye(T, x) : new Ee(T, x), g.isSkinnedMesh === !0 && g.normalizeSkinWeights(), p.mode === M.TRIANGLE_STRIP ? g.geometry = ce(g.geometry, fe) : p.mode === M.TRIANGLE_FAN && (g.geometry = ce(g.geometry, Q));
        else if (p.mode === M.LINES)
          g = new Qe(T, x);
        else if (p.mode === M.LINE_STRIP)
          g = new Ze(T, x);
        else if (p.mode === M.LINE_LOOP)
          g = new Je(T, x);
        else if (p.mode === M.POINTS)
          g = new $e(T, x);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
        Object.keys(g.geometry.morphAttributes).length > 0 && Zt(g, s), g.name = t.createUniqueName(s.name || "mesh_" + e), b(g, s), p.extensions && D(n, g, p), t.assignFinalMaterial(g), l.push(g);
      }
      for (let f = 0, m = l.length; f < m; f++)
        t.associations.set(l[f], {
          meshes: e,
          primitives: f
        });
      if (l.length === 1)
        return s.extensions && D(n, l[0], s), l[0];
      const d = new X();
      s.extensions && D(n, d, s), t.associations.set(d, { meshes: e });
      for (let f = 0, m = l.length; f < m; f++)
        d.add(l[f]);
      return d;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(e) {
    let t;
    const r = this.json.cameras[e], n = r[r.type];
    if (!n) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return r.type === "perspective" ? t = new ye(et.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6) : r.type === "orthographic" && (t = new tt(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)), r.name && (t.name = this.createUniqueName(r.name)), b(t, r), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], r = [];
    for (let n = 0, s = t.joints.length; n < s; n++)
      r.push(this._loadNodeShallow(t.joints[n]));
    return t.inverseBindMatrices !== void 0 ? r.push(this.getDependency("accessor", t.inverseBindMatrices)) : r.push(null), Promise.all(r).then(function(n) {
      const s = n.pop(), i = n, a = [], o = [];
      for (let c = 0, u = i.length; c < u; c++) {
        const l = i[c];
        if (l) {
          a.push(l);
          const d = new j();
          s !== null && d.fromArray(s.array, c * 16), o.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new nt(a, o);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const t = this.json, r = this, n = t.animations[e], s = n.name ? n.name : "animation_" + e, i = [], a = [], o = [], c = [], u = [];
    for (let l = 0, d = n.channels.length; l < d; l++) {
      const f = n.channels[l], m = n.samplers[f.sampler], T = f.target, p = T.node, g = n.parameters !== void 0 ? n.parameters[m.input] : m.input, x = n.parameters !== void 0 ? n.parameters[m.output] : m.output;
      T.node !== void 0 && (i.push(this.getDependency("node", p)), a.push(this.getDependency("accessor", g)), o.push(this.getDependency("accessor", x)), c.push(m), u.push(T));
    }
    return Promise.all([
      Promise.all(i),
      Promise.all(a),
      Promise.all(o),
      Promise.all(c),
      Promise.all(u)
    ]).then(function(l) {
      const d = l[0], f = l[1], m = l[2], T = l[3], p = l[4], g = [];
      for (let x = 0, w = d.length; x < w; x++) {
        const R = d[x], L = f[x], C = m[x], _ = T[x], H = p[x];
        if (R === void 0) continue;
        R.updateMatrix && R.updateMatrix();
        const O = r._createAnimationTracks(R, L, C, _, H);
        if (O)
          for (let K = 0; K < O.length; K++)
            g.push(O[K]);
      }
      return new st(s, void 0, g);
    });
  }
  createNodeMesh(e) {
    const t = this.json, r = this, n = t.nodes[e];
    return n.mesh === void 0 ? null : r.getDependency("mesh", n.mesh).then(function(s) {
      const i = r._getNodeRef(r.meshCache, n.mesh, s);
      return n.weights !== void 0 && i.traverse(function(a) {
        if (a.isMesh)
          for (let o = 0, c = n.weights.length; o < c; o++)
            a.morphTargetInfluences[o] = n.weights[o];
      }), i;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const t = this.json, r = this, n = t.nodes[e], s = r._loadNodeShallow(e), i = [], a = n.children || [];
    for (let c = 0, u = a.length; c < u; c++)
      i.push(r.getDependency("node", a[c]));
    const o = n.skin === void 0 ? Promise.resolve(null) : r.getDependency("skin", n.skin);
    return Promise.all([
      s,
      Promise.all(i),
      o
    ]).then(function(c) {
      const u = c[0], l = c[1], d = c[2];
      d !== null && u.traverse(function(f) {
        f.isSkinnedMesh && f.bind(d, en);
      });
      for (let f = 0, m = l.length; f < m; f++)
        u.add(l[f]);
      return u;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, r = this.extensions, n = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const s = t.nodes[e], i = s.name ? n.createUniqueName(s.name) : "", a = [], o = n._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return o && a.push(o), s.camera !== void 0 && a.push(n.getDependency("camera", s.camera).then(function(c) {
      return n._getNodeRef(n.cameraCache, s.camera, c);
    })), n._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      a.push(c);
    }), this.nodeCache[e] = Promise.all(a).then(function(c) {
      let u;
      if (s.isBone === !0 ? u = new it() : c.length > 1 ? u = new X() : c.length === 1 ? u = c[0] : u = new Te(), u !== c[0])
        for (let l = 0, d = c.length; l < d; l++)
          u.add(c[l]);
      if (s.name && (u.userData.name = s.name, u.name = i), b(u, s), s.extensions && D(r, u, s), s.matrix !== void 0) {
        const l = new j();
        l.fromArray(s.matrix), u.applyMatrix4(l);
      } else
        s.translation !== void 0 && u.position.fromArray(s.translation), s.rotation !== void 0 && u.quaternion.fromArray(s.rotation), s.scale !== void 0 && u.scale.fromArray(s.scale);
      return n.associations.has(u) || n.associations.set(u, {}), n.associations.get(u).nodes = e, u;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, r = this.json.scenes[e], n = this, s = new X();
    r.name && (s.name = n.createUniqueName(r.name)), b(s, r), r.extensions && D(t, s, r);
    const i = r.nodes || [], a = [];
    for (let o = 0, c = i.length; o < c; o++)
      a.push(n.getDependency("node", i[o]));
    return Promise.all(a).then(function(o) {
      for (let u = 0, l = o.length; u < l; u++)
        s.add(o[u]);
      const c = (u) => {
        const l = /* @__PURE__ */ new Map();
        for (const [d, f] of n.associations)
          (d instanceof z || d instanceof se) && l.set(d, f);
        return u.traverse((d) => {
          const f = n.associations.get(d);
          f != null && l.set(d, f);
        }), l;
      };
      return n.associations = c(s), s;
    });
  }
  _createAnimationTracks(e, t, r, n, s) {
    const i = [], a = e.name ? e.name : e.uuid, o = [];
    P[s.path] === P.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && o.push(d.name ? d.name : d.uuid);
    }) : o.push(a);
    let c;
    switch (P[s.path]) {
      case P.weights:
        c = re;
        break;
      case P.rotation:
        c = oe;
        break;
      case P.position:
      case P.scale:
        c = ie;
        break;
      default:
        switch (r.itemSize) {
          case 1:
            c = re;
            break;
          case 2:
          case 3:
          default:
            c = ie;
            break;
        }
        break;
    }
    const u = n.interpolation !== void 0 ? qt[n.interpolation] : Me, l = this._getArrayFromAccessor(r);
    for (let d = 0, f = o.length; d < f; d++) {
      const m = new c(
        o[d] + "." + P[s.path],
        t.array,
        l,
        u
      );
      n.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(m), i.push(m);
    }
    return i;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const r = $(t.constructor), n = new Float32Array(t.length);
      for (let s = 0, i = t.length; s < i; s++)
        n[s] = t[s] * r;
      t = n;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(r) {
      const n = this instanceof oe ? Wt : Se;
      return new n(this.times, this.values, this.getValueSize() / 3, r);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function nn(h, e, t) {
  const r = e.attributes, n = new _e();
  if (r.POSITION !== void 0) {
    const a = t.json.accessors[r.POSITION], o = a.min, c = a.max;
    if (o !== void 0 && c !== void 0) {
      if (n.set(
        new F(o[0], o[1], o[2]),
        new F(c[0], c[1], c[2])
      ), a.normalized) {
        const u = $(B[a.componentType]);
        n.min.multiplyScalar(u), n.max.multiplyScalar(u);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const s = e.targets;
  if (s !== void 0) {
    const a = new F(), o = new F();
    for (let c = 0, u = s.length; c < u; c++) {
      const l = s[c];
      if (l.POSITION !== void 0) {
        const d = t.json.accessors[l.POSITION], f = d.min, m = d.max;
        if (f !== void 0 && m !== void 0) {
          if (o.setX(Math.max(Math.abs(f[0]), Math.abs(m[0]))), o.setY(Math.max(Math.abs(f[1]), Math.abs(m[1]))), o.setZ(Math.max(Math.abs(f[2]), Math.abs(m[2]))), d.normalized) {
            const T = $(B[d.componentType]);
            o.multiplyScalar(T);
          }
          a.max(o);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(a);
  }
  h.boundingBox = n;
  const i = new ft();
  n.getCenter(i.center), i.radius = n.min.distanceTo(n.max) / 2, h.boundingSphere = i;
}
function de(h, e, t) {
  const r = e.attributes, n = [];
  function s(i, a) {
    return t.getDependency("accessor", i).then(function(o) {
      h.setAttribute(a, o);
    });
  }
  for (const i in r) {
    const a = J[i] || i.toLowerCase();
    a in h.attributes || n.push(s(r[i], a));
  }
  if (e.indices !== void 0 && !h.index) {
    const i = t.getDependency("accessor", e.indices).then(function(a) {
      h.setIndex(a);
    });
    n.push(i);
  }
  return ne.workingColorSpace !== N && "COLOR_0" in r && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ne.workingColorSpace}" not supported.`), b(h, e), nn(h, e, t), Promise.all(n).then(function() {
    return e.targets !== void 0 ? Qt(h, e.targets, t) : h;
  });
}
const sn = {
  diceColor: 0,
  // 骰子颜色
  diceScale: 5,
  // 骰子放大系数
  lightPosition: [20, 100, -50],
  // 灯光位置
  lightIntensity: 5,
  // 灯光强度
  lightDecay: 0.2,
  // 光衰强度
  shadowOpacity: 0.7,
  // 阴影透明度
  shadowColor: 0,
  // 阴影颜色
  shadowEnable: !0,
  // 开启阴影
  cameraPosition: [15, 15, 15],
  // 相机相对于骰子的位置
  ambientLightColor: 16777215,
  // 环境光颜色
  ambientLightIntensity: 1,
  // 环境光强度
  throwPotion: [0, 50, 0],
  // 骰子投掷位置
  angularVelocity: [0, -10, 10],
  // 投掷旋转速度
  velocity: [-36, -17, -24],
  // 各个方向的速度
  refreshRate: 60,
  // 屏幕刷新率
  gravity: [0, -100, 0],
  // 物理引擎重力
  restitution: 0.5,
  // 反弹系数
  background: 16777215,
  // 渲染器背景颜色
  lightColor: 16777215
  // 灯光颜色
};
class ln {
  /**
   * @param {object} params 初始化参数
   * @param {number} params.diceColor 骰子颜色 默认- 0x000000
   * @param {number} params.diceScale 骰子放大系数 默认- 5
   * @param {number[]} params.lightPosition 灯光位置 默认- [20, 100, -50]
   * @param {number} params.lightIntensity 灯光强度 默认- 5
   * @param {number} params.lightDecay 光衰系数 默认- 0.2
   * @param {number} params.shadowOpacity 投影透明度 默认- 0.7
   * @param {number} params.shadowColor 投影颜色 默认- 0x000000
   * @param {boolean} params.shadowEnable 是否开启投影 默认- true
   * @param {[number,number,number]} params.cameraPosition 相机相对于骰子的位置 默认- [15, 15, 15]
   * @param {number} params.ambientLightColor 环境光颜色 默认- 0xFFFFFF
   * @param {number} params.ambientLightIntensity 环境光强度 默认- 1
   * @param {number[]} params.throwPotion 投掷起始位置 默认- [0, 50, 0]
   * @param {number[]} params.angularVelocity 投掷旋转量 默认- [0, -10, 10]
   * @param {number[]} params.velocity 各个方向的速度 默认- [-36, -17, -24]
   * @param {number} params.ambientLightColor 环境光颜色 默认- 0xFFFFFF
   * @param {number} params.refreshRate 屏幕刷新率 默认- 60
   * @param {number[]} params.gravity 各个方向的重力 默认- [0,-100,0]
   * @param {number} params.restitution 反弹系数 默认- 0.5
   * @param {number} params.background 渲染器背景色 默认- 0xFFFFFF
   * @param {number} params.lightColor 灯光颜色 默认- 0xFFFFFF
   */
  constructor(e) {
    E(this, "scene", new mt());
    E(this, "renderer", new gt({ antialias: !0 }));
    E(this, "camera", new ye(75));
    E(this, "world", new Ne());
    E(this, "diceModle");
    E(this, "floor");
    E(this, "diceBody");
    E(this, "interaction");
    E(this, "threeChildren", {});
    E(this, "start_throw", !1);
    E(this, "event", []);
    E(this, "directionalLight");
    E(this, "element");
    E(this, "options", { modlePath: "/dice/dice.glb" });
    E(this, "contactMaterial");
    if (Object.assign(this.options, sn, e), !this.options.element)
      throw new Error("请传入容器Element");
    const t = this.options.element;
    this.initThree(), this.resizie(t);
  }
  initWorld() {
    const { restitution: e } = this.options, t = new _e();
    t.expandByObject(this.diceModle);
    const r = new F();
    t.getSize(r);
    const n = new ee(), s = new te({
      mass: 1,
      position: new y(0, r.y / 2, 0),
      shape: new Ce(new y(r.x / 2, r.y / 2, r.z / 2)),
      material: n
    });
    this.diceBody = s;
    const i = new ee(), a = new te({
      mass: 0,
      shape: new Oe(),
      material: i
    });
    a.quaternion.setFromEuler(-Math.PI / 2, 0, 0), this.world.addBody(a), this.world.addBody(s);
    const o = new Pe(
      i,
      n,
      {
        restitution: e
        // 反弹恢复系数
      }
    );
    this.contactMaterial = o, this.world.addContactMaterial(o), this.updateWorld();
  }
  updateWorld() {
    const { gravity: e, restitution: t } = this.options;
    this.world.gravity.set(e[0], e[1], e[2]), this.contactMaterial.restitution = t;
  }
  async loadMoudle() {
    const { diceScale: e, modlePath: t } = this.options, r = await new Et().loadAsync(t);
    this.diceModle = r.scene, this.diceModle.on("click", () => {
      var o, c, u, l;
      const { throwPotion: n, angularVelocity: s, velocity: i } = this.options;
      if (this.start_throw)
        return;
      this.start_throw = !0;
      const a = Math.random() * 3;
      (o = this.diceBody) == null || o.quaternion.setFromEuler(
        Math.PI / a,
        Math.PI / 4,
        Math.PI / a
      ), this.diceBody.position.copy(new y(...n)), (c = this.diceBody) == null || c.angularVelocity.copy(new y(...s)), (u = this.diceBody) == null || u.velocity.copy(new y(...i)), (l = this.world) == null || l.addBody(this.diceBody);
    }), this.diceModle.traverse((n) => {
      if (n.castShadow = !0, n.isMesh && n.name === "Object_4") {
        const s = n.material;
        s.color = new I(944710);
      }
    }), this.scene.add(this.diceModle), r.scene.scale.set(e, e, e);
  }
  async initThree() {
    const { element: e, ambientLightColor: t, ambientLightIntensity: r, lightColor: n, lightIntensity: s, shadowOpacity: i } = this.options;
    this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.outputColorSpace = "srgb", this.renderer.shadowMap.type = ae, this.threeChildren.amlight = new At(t, r);
    const a = new me(n, s);
    this.threeChildren.light = a;
    const o = new Tt(1e3, 1e3), c = new xt({
      transparent: !0,
      opacity: i,
      name: "shadow"
    }), u = new Ee(o, c);
    this.threeChildren.floor = u, u.rotation.set(-Math.PI / 2, 0, 0), u.receiveShadow = !0, a.castShadow = !0, a.shadow.mapSize.width = 2048, a.shadow.mapSize.height = 2048, a.shadow.camera.near = 0.5, a.shadow.camera.far = 500, await this.loadMoudle(), this.initWorld(), this.update(), this.interaction = new wt(this.renderer, this.scene, this.camera), this.scene.add(a, u, this.threeChildren.amlight), e == null || e.appendChild(this.renderer.domElement), this.render();
  }
  update() {
    var m, T, p, g;
    const { shadowOpacity: e, shadowColor: t, diceScale: r, diceColor: n, element: s, background: i, shadowEnable: a, ambientLightColor: o, ambientLightIntensity: c, lightColor: u, lightDecay: l, lightIntensity: d, lightPosition: f } = this.options;
    this.camera.aspect = s.clientWidth / s.clientHeight, this.renderer.setClearColor(i), this.renderer.setSize(s.clientWidth, s.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.outputColorSpace = "srgb", this.renderer.shadowMap.enabled = a, this.renderer.shadowMap.type = ae, (m = this.threeChildren.amlight) == null || m.color.set(o), this.threeChildren.amlight.intensity = c, (T = this.threeChildren.light) == null || T.color.set(u), this.threeChildren.light.intensity = d, this.threeChildren.light.decay = l, this.threeChildren.light.position.copy(new F(...f)), this.threeChildren.light.castShadow = !0, this.threeChildren.light.shadow.mapSize.width = 2048, this.threeChildren.light.shadow.mapSize.height = 2048, this.threeChildren.light.shadow.camera.near = 0.5, this.threeChildren.light.shadow.camera.far = 500, this.diceModle.traverse((x) => {
      if (x.castShadow = !0, x.isMesh && x.name === "Object_4") {
        const w = x.material;
        w.color = new I(n);
      }
    }), (p = this.diceModle) == null || p.scale.set(r, r, r), (g = this.threeChildren.floor) == null || g.material.color.set(t), this.threeChildren.floor.material.opacity = e;
  }
  resizie(e) {
    new ResizeObserver(() => {
      this.renderer.clear(), this.renderer.setSize(e.clientWidth, e.clientHeight), this.camera.aspect = e.clientWidth / e.clientHeight, this.camera.updateProjectionMatrix();
    }).observe(e);
  }
  render() {
    var t, r, n, s, i, a;
    const { refreshRate: e } = this.options;
    if ((t = this.directionalLight) == null || t.lookAt(this.diceModle.position), (r = this.world) == null || r.step(1 / e), (n = this.renderer) == null || n.render(this.scene, this.camera), this.localView(), this.diceModle && ((s = this.diceBody) != null && s.position) && ((i = this.diceModle) == null || i.position.copy(this.diceBody.position), (a = this.diceModle) == null || a.quaternion.copy(this.diceBody.quaternion), this.isBodyStoped(this.diceBody) && this.start_throw)) {
      if (this.event.length) {
        const o = this.getNumber();
        this.event.forEach((c) => {
          c(o);
        });
      }
      this.start_throw = !1;
    }
    requestAnimationFrame(this.render.bind(this));
  }
  enableSceneHelper() {
    this.scene.add(new Rt(10));
  }
  /**
   * 监听点数
   * @param {Function} callback
   */
  on(e) {
    this.event.push(e);
  }
  localView() {
    const { cameraPosition: e } = this.options;
    this.diceModle && this.diceBody && (this.camera.position.x = this.diceModle.position.x + e[0], this.camera.position.y = this.diceModle.position.y + e[1], this.camera.position.z = this.diceModle.position.z + e[2], this.camera.lookAt(this.diceModle.position));
  }
  getNumber() {
    var s;
    const e = [
      new y(0, 1, 0),
      // 面1
      new y(0, 0, -1),
      // 面2
      new y(-1, 0, 0),
      // 面3
      new y(1, 0, 0),
      // 面4
      new y(0, 0, 1),
      // 面5
      new y(0, -1, 0)
      // 面6
    ], t = {
      "0,1,0": 2,
      "0,-1,0": 4,
      "1,0,0": 6,
      "-1,0,0": 5,
      "0,0,1": 3,
      "0,0,-1": 1
    };
    let r = -1 / 0, n = null;
    for (const i of e) {
      const a = (s = this.diceBody) == null ? void 0 : s.quaternion.vmult(i), o = a == null ? void 0 : a.dot(new y(0, 1, 0));
      o > r && (r = o, n = i);
    }
    return t[`${n.x},${n.y},${n.z}`];
  }
  isBodyStoped(e, t = 0.1, r = 0.1) {
    const n = e.velocity.length(), s = e.angularVelocity.length();
    return n < t && s < r;
  }
}
export {
  ln as Dice
};
