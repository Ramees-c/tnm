import React from "react";

const BlogContent = () => {
  return (
    <article className="bg-white rounded-lg shadow-md p-6">
      {/* Featured Image */}
      <img
        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww"
        alt="Blog"
        className="w-full lg:h-80 object-cover rounded-lg mb-6"
      />

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span>📅 March 16, 2022</span>
      </div>

      {/* Blog Content */}
      <p className="text-gray-700 leading-relaxed mb-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur,
        alias doloremque unde quo quaerat quos error laborum numquam repellat,
        temporibus sequi magni nesciunt repellendus, tempora tenetur? Nulla,
        aspernatur? Neque odio, corrupti mollitia omnis magni officiis quam
        voluptatem eligendi eum non vero eveniet repellendus sequi quaerat
        pariatur? Quasi libero voluptatibus deserunt illum, ipsam non.
        Dignissimos necessitatibus debitis, laboriosam commodi rerum ab optio.
        Quae architecto soluta, alias rem quod accusamus nostrum ducimus, natus
        est aliquam quis? Eveniet error quo in doloremque optio repellat labore
        eaque porro, deleniti nobis sit molestias quos quod maxime quam unde
        inventore sequi est nisi quidem consequuntur, beatae perferendis dolorem
        fugiat? Omnis, earum facilis? Libero ut natus excepturi, vero dolorem
        veritatis voluptatum consequatur eum officia quis, consequuntur rerum
        quod id impedit sit mollitia necessitatibus iure nisi assumenda,
        dignissimos cupiditate adipisci enim? Magnam blanditiis exercitationem
        minima itaque aspernatur, porro magni atque nisi, repellat incidunt
        expedita enim obcaecati voluptatibus, rerum sit? Reprehenderit quaerat
        quae exercitationem necessitatibus. Omnis ratione esse quae unde!
        Corporis optio excepturi voluptatibus corrupti ea officiis assumenda non
        est similique, tempore sint sequi tenetur ut. Veritatis assumenda porro
        itaque! Nemo pariatur et in tempora magni quasi accusamus quos explicabo
        numquam id fugit laboriosam adipisci voluptates architecto, quam at.
      </p>

      {/* Quote Box */}
      <blockquote className="bg-green-900 text-white p-6 rounded-lg mb-6">
        <p className="italic font-medium text-lg">
          “Celebrated shone or fail to worse. Weddings and any opinions suitable
          smallest nay. Houses or months settle remove ladies appear…”
        </p>
      </blockquote>

      {/* More Content */}
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Conduct repelled off led whether?
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Pretty merits waited six</li>
        <li>General few civilly amiable pleased account</li>
        <li>Conduct repelled off led whether?</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mb-6">
        Surrounded to me occasional… (more blog text).
      </p>
    </article>
  );
};

export default BlogContent;
